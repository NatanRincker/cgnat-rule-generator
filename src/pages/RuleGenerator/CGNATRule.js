import IPV4Adress from './IPV4Adress'
import IPV4Utils from './IPV4Utils'
import ChainRule from './ChainRule';
import IPRule from './IPRule';

export default class CGNATRule{
    // public atrib.
    privateStartIP;
    publicStartIP;
    portsPerIP;
    numeration;
    addresList;
    rule;
    // private atrib.
    inBuildindgRulePrivateIP;
    inBuildindgRulePublicIP;

    rangesUsedAsChains=[24,26,27,29]
    constructor(privateStartIP, publicStartIP, destination, numeration=null, addresList=null){
        this.privateStartIP = privateStartIP
        this.publicStartIP = publicStartIP
        this.destination = destination
        this.portsPerIP = this.calcPortsPerIP()
        this.numeration = numeration
        this.addresList = addresList

        this.inBuildindgRulePrivateIP = this.privateStartIP
        this.inBuildindgRulePublicIP = this.publicStartIP
    }

    buildRule(){
        this.rule = `/ip firewall nat \n `+this.appendChain(this.privateStartIP.range, true)
    }
    appendChain(range, isStart=false, targetedChainIndex=''){
        let rule;
        if(this.isSubChain(range)){
            let chainComment = isStart? `comment="Inicio CGNAT"` : ``;
            let chainRule='';
            let subRange = this.getSubRange(range)
            let parallelChainsAmount = this.getParallelChainsAmountOf(range)
            for(let chainIndex=1; chainIndex<=parallelChainsAmount; chainIndex++){
                let jumpTarget = targetedChainIndex+`-${chainIndex}`;
                let chain = new ChainRule(
                    isStart? `srcnat`:targetedChainIndex,
                    chainComment,
                    jumpTarget,
                    `${this.inBuildindgRulePrivateIP.addres}/${range}`
                );
                chain.buildRule()
                chainRule+=chain.rule
                chainRule+=this.appendChain(subRange, false, jumpTarget)
            }
            rule=chainRule
        }else{
            let ipRule = this.appendIpRule(targetedChainIndex)
            rule = ipRule
        }
        return rule
    }
    appendIpRule(chainIndex){
        let innerChainRule='';
        console.log('/29')
        for(let i=1; i<=IPV4Utils.getIPAmountOnRange(29);i++){
            let ipRule = new IPRule(
                chainIndex,
                this.inBuildindgRulePrivateIP.addres,
                this.addresList,
                this.inBuildindgRulePublicIP.addres,
                this.inBuildindgRulePublicIP.getNextGapOfFreePorts(this.portsPerIP)
            )
            ipRule.buildRule()
            
            this.inBuildindgRulePublicIP.occupyPorts(this.portsPerIP)
            if(this.inBuildindgRulePublicIP.allPortsAreOccupied()){
                this.inBuildindgRulePublicIP.increment()
            }
            this.inBuildindgRulePrivateIP.increment()
            console.log(ipRule.rule)
            innerChainRule+= ipRule.rule
        }
        return innerChainRule
    }

    isSubChain(range){
        return this.rangesUsedAsChains.some(chainRange => chainRange===range)
    }
    getSubRange(range){
        return this.rangesUsedAsChains.find(chainRange => chainRange>range)
    }
    getParallelChainsAmountOf(range){
        if(this.rangesUsedAsChains[0]!==range){
            let superRangeIndex = this.rangesUsedAsChains.findIndex(chainRange => chainRange===range)-1
            return Math.pow(2,range-this.rangesUsedAsChains[superRangeIndex])
        }else{
            return 1
        }
    }
    calcPortsPerIP(){
        let privateIPAmount = this.destination.iPAmount
        return IPV4Utils.CLIENT_AVAILABLE_PORTS/privateIPAmount
    }
}