export default class IPRule{
    action=`src-nat`
    key;
    comment;
    protocols;
    srcAddres;
    dstAddressList;
    toAddress;
    toPorts;
    rule

    //optional attributes
    atributeDstAddressList
    constructor(key, srcAddres, dstAddressList, toAddress, toPorts, protocols){
        this.key=key;
        this.comment=`CGNAT IP ${srcAddres} Porta ${toPorts} To ${toAddress}`;
        this.srcAddres=srcAddres;
        this.dstAddressList=dstAddressList;
        this.toAddress=toAddress;
        this.toPorts=toPorts;
        this.rule=''
        this.atributeDstAddressList = (this.dstAddressList!=='')? ` dst-address-list=!"${this.dstAddressList}"`:''
        this.protocols = protocols
    }

    buildRule(){
        this.protocols.forEach(protocol =>{
            let inStringToPorts = (protocol==='icmp')? '':` to-ports="${this.toPorts}"`
            this.rule += `\t\tadd action="${this.action}" chain="cgnat${this.key}" comment="${this.comment}" protocol="${protocol}" src-address="${this.srcAddres}"${this.atributeDstAddressList} to-address="${this.toAddress}"${inStringToPorts}\n`    
        })
    }
}