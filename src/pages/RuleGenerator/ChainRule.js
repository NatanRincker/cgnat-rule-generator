export default class ChainRule{
    action=`jump`
    key;
    comment;
    jumpTarget;
    srcAddress;
    rule
    constructor(key, comment, jumpTarget, srcAddress){
        this.key=key
        this.comment=comment
        this.jumpTarget=jumpTarget
        this.srcAddress=srcAddress
    }

    buildRule(){
        this.rule = `add action="${this.action}" chain=${this.key} ${this.comment} jump-target="cgnat${this.jumpTarget}" src-address="${this.srcAddress}" \n `
    }
}