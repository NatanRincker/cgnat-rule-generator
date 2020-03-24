import IPV4Adress from './IPV4Adress'
import IPV4Utils from './IPV4Utils'
import ChainRule from './ChainRule';
import IPRule from './IPRule';
import ArrayUtils from './../../tools/ArrayUtils'

export default class CGNATRule{
    static standartChains=[16, 18, 20, 24, 26, 27, 29]
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
    rangesUsedAsChains
    constructor(privateStartIP, publicStartIP, destination, numeration=null, addresList=null){
        this.privateStartIP = new IPV4Adress(privateStartIP.addres, privateStartIP.range)
        this.publicStartIP = new IPV4Adress(publicStartIP.addres, publicStartIP.range)
        this.destination = destination
        this.portsPerIP = this.calcPortsPerIP()
        this.numeration = numeration
        this.addresList = addresList

        this.inBuildindgRulePrivateIP = new IPV4Adress(this.privateStartIP.addres, this.privateStartIP.range)
        this.inBuildindgRulePublicIP = new IPV4Adress(this.publicStartIP.addres, this.publicStartIP.range)

        this.rangesUsedAsChains = CGNATRule.standartChains.filter(chain => chain>this.privateStartIP.range)
        this.rangesUsedAsChains.unshift(this.privateStartIP.range)
        console.log('rangesUsedAsChains'+this.rangesUsedAsChains)
    }

    buildRule(){
        this.rule = `/ip firewall nat \n `+this.appendChain(this.privateStartIP.range, true)
        

    }
    appendChain(range, isStart=false, targetedChainIndex=''){
        let rule;
        if(this.isSubChain(range) || isStart){
            let chainComment = isStart? `comment="Inicio CGNAT"` : ``;
            let chainKey;
            let jumpTarget;
            let srcAddres;

            let chainRule='';
            let subRange = this.getSubRange(range)
            let parallelChainsAmount = this.getParallelChainsAmount(range)
            console.log("rangesUsedAsChains"+this.rangesUsedAsChains)
            for(let chainIndex=1; chainIndex<=parallelChainsAmount; chainIndex++){
                if(isStart){
                    chainKey = `srcnat`;
                    jumpTarget = `-${this.numeration}`;
                }else{
                    chainKey = targetedChainIndex;
                    jumpTarget = targetedChainIndex+`-${chainIndex}`;
                }
                srcAddres =  `${this.inBuildindgRulePrivateIP.addres}/${range}`;
                let chain = new ChainRule(chainKey, chainComment, jumpTarget, srcAddres);
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
    getParallelChainsAmount(range){
        if(this.rangesUsedAsChains[0]!==range){
            let revertedRangesUsedAsChains = ArrayUtils.invert(this.rangesUsedAsChains);
            let superRangeIndex = revertedRangesUsedAsChains.findIndex(chainRange => chainRange<range)
            console.log( '/'+revertedRangesUsedAsChains[superRangeIndex]+' = '+Math.pow(2,range-revertedRangesUsedAsChains[superRangeIndex]) +'grupo de /'+range)
            return Math.pow(2,range-revertedRangesUsedAsChains[superRangeIndex])
        }else{
            return 1
        }
    }
    calcPortsPerIP(){
        let privateIPAmount = this.destination.iPAmount
        return IPV4Utils.CLIENT_AVAILABLE_PORTS/privateIPAmount
    }
}