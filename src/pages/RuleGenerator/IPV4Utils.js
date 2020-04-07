export default class IPV4Utils{
    static TOTAL_PORTS = 65535
    static RESERVED_PORTS = 1535
    static CLIENT_AVAILABLE_PORTS = 64000
    static BITS_AMOUNT = 32
    static getIPAmountOnRange(ocupiedBits){
        let freeBits = IPV4Utils.BITS_AMOUNT - ocupiedBits
        return Math.pow(2,freeBits)
    }
    static IPV4_REGEX=/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
    static isValidIPV4(string){
       return IPV4Utils.IPV4_REGEX.test(string)
    }
}