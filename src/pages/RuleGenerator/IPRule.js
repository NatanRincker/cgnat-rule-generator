export default class IPRule{
    action=`src-nat`
    key;
    comment;
    protocols=['tcp','udp','icmp'];
    srcAddres;
    dstAddressList;
    toAddress;
    toPorts;
    rule

    //optional attributes
    atributeDstAddressList
    constructor(key, srcAddres, dstAddressList, toAddress, toPorts){
        this.key=key;
        this.comment=`CGNAT IP ${srcAddres} Porta ${toPorts} To ${toAddress}`;
        this.srcAddres=srcAddres;
        this.dstAddressList=dstAddressList;
        this.toAddress=toAddress;
        this.toPorts=toPorts;
        this.rule=''
        this.atributeDstAddressList = (this.dstAddressList!=='')? ` dst-address-list=!"${this.dstAddressList}"`:''

    }

    buildRule(){
        this.protocols.forEach(protocol =>{
            this.rule += `\t\tadd action="${this.action}" chain=${this.key} comment="${this.comment}" protocol="${protocol}" src-address="${this.srcAddres}"${this.atributeDstAddressList} to-address="${this.toAddress}" to-ports="${this.toPorts}"\n`    
        })
    }
}