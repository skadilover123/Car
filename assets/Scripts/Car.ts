import { _decorator, EventKeyboard, ITriggerEvent, Component, Node, Input, input, KeyCode, Collider, Label, director, AudioSource } from 'cc';
import { frameIndependentStep } from './MotionUtil';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    @property(Node)
    C_Node: Node = null

    @property(Node)
    TextBox: Node = null

    @property()
    Car_Speed: number = 30

    @property({ tooltip: "横向移动边界（±boundary）" })
    boundary: number = 2

    Car_Move = { L: false, R: false }
    Car_Collider: Collider = null
    isRunning = true
    UILabel: Label = null
    Sound: AudioSource = null

    protected onLoad(): void {
        console.assert(Boolean(this.C_Node && this.TextBox), "[Car] 场景节点未绑定");
        input.on(Input.EventType.KEY_DOWN, this.Key_Down, this)
        input.on(Input.EventType.KEY_UP, this.Key_Up, this)
        this.Car_Collider = this.node.getComponent(Collider)
        console.assert(Boolean(this.Car_Collider), "[Car] 节点缺少 Collider 组件")
        this.Car_Collider.on("onTriggerEnter", this.Start_Collider, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.Key_Down, this)
        input.off(Input.EventType.KEY_UP, this.Key_Up, this)
        this.Car_Collider.off("onTriggerEnter", this.Start_Collider, this)
    }

    Start_Collider(event: ITriggerEvent) {
        this.isRunning = false
        this.TextBox.active = true
        this.Sound.stop()
        if (event.otherCollider.node.name == "wall") {
            this.UILabel.string = "成功了"
        } else {
            this.UILabel.string = "失败了"
        }
    }

    Key_Down(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_A || event.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = true
        } else if (event.keyCode == KeyCode.KEY_D || event.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = true
        }
    }

    Key_Up(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_A || event.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = false
        } else if (event.keyCode == KeyCode.KEY_D || event.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = false
        }
    }

    start() {
        console.assert(Boolean(this.TextBox && this.node.getComponent(AudioSource)), "[Car] UI / 音源未就绪")
        this.TextBox.active = false
        this.UILabel = this.TextBox.getComponentInChildren(Label)
        this.Sound = this.node.getComponent(AudioSource)
        this.Sound.play()
    }

    update(deltaTime: number) {
        if (!this.isRunning) { return }
        const Car_Pos = this.node.getPosition()
        const C_Pos = this.C_Node.getPosition()
        const Speed = frameIndependentStep(this.Car_Speed, deltaTime)
        if (this.Car_Move.L && !this.Car_Move.R) {
            if (Car_Pos.x >= -this.boundary) { Car_Pos.x = Car_Pos.x - Speed }
        } else if (this.Car_Move.R && !this.Car_Move.L) {
            if (Car_Pos.x <= this.boundary) { Car_Pos.x = Car_Pos.x + Speed }
        }
        this.node.setPosition(Car_Pos.x, Car_Pos.y, Car_Pos.z - Speed)
        this.C_Node.setPosition(C_Pos.x, C_Pos.y, C_Pos.z - Speed)
    }

    restart() {
        director.loadScene("Car")
    }
}
