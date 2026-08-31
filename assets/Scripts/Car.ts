import { _decorator, Component, Node, Input, input, KeyCode, Collider, Label, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    @property(Node)
    C_Node: Node = null

    @property(Node)
    TextBox: Node = null

    @property
    Car_Speed: number = 30

    Car_Move = { L: false, R: false }
    Car_Collider: Collider = null
    Move = true
    UILabel: Label = null
    Sound: AudioSource = null

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.Key_Down, this)
        input.on(Input.EventType.KEY_UP, this.Key_Up, this)
        this.Car_Collider = this.node.getComponent(Collider)
        this.Car_Collider.on("onTriggerEnter", this.Start_Collider, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.Key_Down, this)
        input.off(Input.EventType.KEY_UP, this.Key_Up, this)
        this.Car_Collider.off("onTriggerEnter", this.Start_Collider, this)

    }

    Start_Collider(C) {
        this.Move = false
        this.TextBox.active = true
        this.Sound.stop()
        if (C.otherCollider.node.name == "wall") {
            this.UILabel.string = "成功了"
        } else {
            this.UILabel.string = "失败了"
        }
    }

    Key_Down(key) {
        if (key.keyCode == KeyCode.KEY_A || key.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = true
        } else if (key.keyCode == KeyCode.KEY_D || key.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = true
        }
    }

    Key_Up(key) {
        if (key.keyCode == KeyCode.KEY_A || key.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = false
        } else if (key.keyCode == KeyCode.KEY_D || key.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = false
        }
    }

    start() {
        this.TextBox.active = false
        this.UILabel = this.TextBox.getComponentInChildren(Label)
        this.Sound = this.node.getComponent(AudioSource)
        this.Sound.play()
    }

    update(deltaTime: number) {
        if (!this.Move) { return }
        const Car_Pos = this.node.getPosition()
        const C_Pos = this.C_Node.getPosition()
        const Speed = deltaTime * this.Car_Speed
        if (this.Car_Move.L && !this.Car_Move.R) {
            if (Car_Pos.x >= -2) { Car_Pos.x = Car_Pos.x - Speed }
        } else if (this.Car_Move.R && !this.Car_Move.L) {
            if (Car_Pos.x <= 2) { Car_Pos.x = Car_Pos.x + Speed }
        }
        this.node.setPosition(Car_Pos.x, Car_Pos.y, Car_Pos.z - Speed)
        this.C_Node.setPosition(C_Pos.x, C_Pos.y, C_Pos.z - Speed)
    }

    restart() {
        director.loadScene("Car")
    }
}

