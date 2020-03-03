import IPV4Utils from "./IPV4Utils";

export default class IPV4Adress{
    addres;
    byteArray=[];
    range;
    occupiedPorts;
    constructor(addres, range){
        this.addres=addres
        this.range=range
        this.byteArray=this.splitIPInBytes(addres)
        this.occupiedPorts = IPV4Utils.RESERVED_PORTS
    }

    splitIPInBytes(str){
        return str.split('.').filter(byte => {
            if(byte!==''){
                return byte
            }
        }).map(byte => parseInt(byte))
    }

    getNextGapOfFreePorts(portAmount){
        console.log('portAmount'+portAmount)
        let gapStart = (this.areTherePortsAvailableFor(1))? this.occupiedPorts+1:0;
        let gapEnd=0;
        if(gapStart!==0){
            gapEnd = (this.areTherePortsAvailableFor(portAmount))? this.occupiedPorts+portAmount: IPV4Utils.TOTAL_PORTS;
        }
        return `${gapStart}-${gapEnd}`
    }

    areTherePortsAvailableFor(portAmount){
        return this.occupiedPorts+portAmount<=IPV4Utils.TOTAL_PORTS
    }
    allPortsAreOccupied(){
        return this.occupiedPorts===IPV4Utils.TOTAL_PORTS
    }
    occupyPorts(portAmount){
        this.occupiedPorts+=(this.areTherePortsAvailableFor(portAmount))? portAmount:0        
    }

    increment(goUp=1){
        this.incrementInByteArray(goUp, this.byteArray.length-1)
        this.buildAddresString()
        this.occupiedPorts=IPV4Utils.RESERVED_PORTS
    }
    incrementInByteArray(goUp=1, byteIndex=this.byteArray.length-1){
        let next = (byteIndex < 3)? 1:goUp
        if(this.byteArray[byteIndex]+next<=255){
            this.byteArray[byteIndex]+=next;
            if(byteIndex < 3){
                this.incrementInByteArray(goUp, byteIndex+1)
            }
        }else{
            goUp -= 256-this.byteArray[byteIndex]
            this.byteArray[byteIndex]=0;
            if(byteIndex > 0){
                this.incrementInByteArray(goUp, byteIndex-1)
            }
        }
    }
    buildAddresString(){
        this.addres = this.byteArray.join('.')
    }
}