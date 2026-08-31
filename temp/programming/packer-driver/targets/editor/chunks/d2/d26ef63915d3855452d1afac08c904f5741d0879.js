System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Input, input, KeyCode, Collider, Label, director, AudioSource, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Car;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Input = _cc.Input;
      input = _cc.input;
      KeyCode = _cc.KeyCode;
      Collider = _cc.Collider;
      Label = _cc.Label;
      director = _cc.director;
      AudioSource = _cc.AudioSource;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5a936/u9GFDxLq8mkKN2Wct", "Car", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Input', 'input', 'KeyCode', 'Collider', 'Label', 'director', 'AudioSource']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Car", Car = (_dec = ccclass('Car'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class Car extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "C_Node", _descriptor, this);

          _initializerDefineProperty(this, "TextBox", _descriptor2, this);

          _initializerDefineProperty(this, "Car_Speed", _descriptor3, this);

          this.Car_Move = {
            L: false,
            R: false
          };
          this.Car_Collider = null;
          this.Move = true;
          this.UILabel = null;
          this.Sound = null;
        }

        onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.Key_Down, this);
          input.on(Input.EventType.KEY_UP, this.Key_Up, this);
          this.Car_Collider = this.node.getComponent(Collider);
          this.Car_Collider.on("onTriggerEnter", this.Start_Collider, this);
        }

        onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.Key_Down, this);
          input.off(Input.EventType.KEY_UP, this.Key_Up, this);
          this.Car_Collider.off("onTriggerEnter", this.Start_Collider, this);
        }

        Start_Collider(C) {
          this.Move = false;
          this.TextBox.active = true;
          this.Sound.stop();

          if (C.otherCollider.node.name == "wall") {
            this.UILabel.string = "成功了";
          } else {
            this.UILabel.string = "失败了";
          }
        }

        Key_Down(key) {
          if (key.keyCode == KeyCode.KEY_A || key.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = true;
          } else if (key.keyCode == KeyCode.KEY_D || key.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = true;
          }
        }

        Key_Up(key) {
          if (key.keyCode == KeyCode.KEY_A || key.keyCode == KeyCode.ARROW_LEFT) {
            this.Car_Move.L = false;
          } else if (key.keyCode == KeyCode.KEY_D || key.keyCode == KeyCode.ARROW_RIGHT) {
            this.Car_Move.R = false;
          }
        }

        start() {
          this.TextBox.active = false;
          this.UILabel = this.TextBox.getComponentInChildren(Label);
          this.Sound = this.node.getComponent(AudioSource);
          this.Sound.play();
        }

        update(deltaTime) {
          if (!this.Move) {
            return;
          }

          const Car_Pos = this.node.getPosition();
          const C_Pos = this.C_Node.getPosition();
          const Speed = deltaTime * this.Car_Speed;

          if (this.Car_Move.L && !this.Car_Move.R) {
            if (Car_Pos.x >= -2) {
              Car_Pos.x = Car_Pos.x - Speed;
            }
          } else if (this.Car_Move.R && !this.Car_Move.L) {
            if (Car_Pos.x <= 2) {
              Car_Pos.x = Car_Pos.x + Speed;
            }
          }

          this.node.setPosition(Car_Pos.x, Car_Pos.y, Car_Pos.z - Speed);
          this.C_Node.setPosition(C_Pos.x, C_Pos.y, C_Pos.z - Speed);
        }

        restart() {
          director.loadScene("Car");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "C_Node", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "TextBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Car_Speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d26ef63915d3855452d1afac08c904f5741d0879.js.map