export default class IPV4Utils{
    static TOTAL_PORTS = 65535
    static RESERVED_PORTS = 1535
    static CLIENT_AVAILABLE_PORTS = 64000
    static BITS_AMOUNT = 32
    static getIPAmountOnRange(ocupiedBits){
        let freeBits = IPV4Utils.BITS_AMOUNT - ocupiedBits
        return Math.pow(2,freeBits)
    }
}