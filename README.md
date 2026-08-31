# 3D 跑酷小游戏 · 3D Endless Runner

基于 **Cocos Creator 3.8.8** + **TypeScript** 的俯视角 3D 小车跑酷原型。小车自动沿赛道前进，玩家通过键盘左右躲避障碍物，抵达终点（wall）判定成功，撞到障碍判定失败。

> A top-down 3D car runner built with Cocos Creator 3.8.8 + TypeScript. The car auto-advances along the track; the player steers left/right to dodge obstacles and reaches the finish line to win.

---

## 技术栈 / Tech Stack

| 项目 | 说明 |
|---|---|
| 游戏引擎 | Cocos Creator 3.8.8 |
| 开发语言 | TypeScript |
| 核心架构 | 组件化（Component）+ 装饰器（`@ccclass` / `@property`） |
| 物理系统 | Collider 触发器（Trigger）做胜负判定 |
| 输入系统 | 全局键盘事件（`input.on(EVENT_KEY_DOWN/UP)`） |
| 音频 | `AudioSource` 播放 / 停止 |
| 场景管理 | `director.loadScene` 重载重开 |

---

## 功能特性 / Features

- **自动前进**：小车以 `Car_Speed`（帧率无关，基于 `deltaTime`）沿 z 轴匀速前进。
- **横向躲避**：`A` / `←` 向左，`D` / `→` 向右，移动范围限制在 ±2 防止驶出赛道。
- **触发器胜负判定**：通过 `Collider.on('onTriggerEnter')` 监听重叠事件；与 `wall` 终点重叠 → 成功，与障碍物重叠 → 失败。
- **跟随相机**：俯视相机随小车沿赛道前进。
- **音效联动**：开始时播放音效，判定结束后停止。
- **UI 提示**：判定后弹出 `TextBox` 显示「成功了 / 失败了」。
- **一键重开**：通过 `director.loadScene` 重新加载场景。

---

## 操作说明 / How to Play

| 按键 | 作用 |
|---|---|
| `A` 或 `←` | 小车向左移动 |
| `D` 或 `→` | 小车向右移动 |
| （自动） | 小车持续向前，无需加速键 |

- 抵达 **wall 终点线** → 显示「成功了」
- 撞到 **障碍物** → 显示「失败了」
- 判定后小车停止、音效停止、UI 弹出

---

## 运行方式 / Run It

1. 安装 [Cocos Creator 3.8.8](https://www.cocos.com/creator)。
2. 用 Cocos Creator 打开本项目根目录（`Project1`）。
3. 在项目资源面板打开主场景 `assets/Scenes/Car.scene`。
4. 点击编辑器顶部的 **运行 / 预览** 按钮（浏览器或模拟器）即可试玩。
5. 如需发布，使用 **项目 → 构建发布** 选择目标平台（Web / Android / iOS 等）。

> 仓库已通过 `.gitignore` 排除 `library/`、`temp/`、`profiles/` 等自动生成目录，克隆后由 Cocos Creator 自动重建。

---

## 项目结构 / Project Structure

```
Project1/
├── assets/
│   ├── Scripts/
│   │   └── Car.ts          # 核心游戏逻辑（移动 / 输入 / 碰撞判定 / 重开）
│   ├── Scenes/
│   │   └── Car.scene       # 主场景（小车、相机、赛道、障碍、wall 终点）
│   └── …                   # 模型 / 音效 / 贴图等资源
├── settings/               # 编辑器与项目配置（打开项目必需）
├── package.json            # 项目信息 + Creator 版本
├── tsconfig.json           # TypeScript 配置
└── .gitignore              # 已排除自动生成目录
```

---

## 核心实现说明 / Implementation Notes

- **组件化 + Inspector 参数**：`Car` 继承 `Component`，用 `@property` 将 `C_Node`（相机）、`TextBox`（UI）、`Car_Speed`（速度）暴露到编辑器面板，便于调参。
- **状态机式输入**：`KEY_DOWN` / `KEY_UP` 维护 `Car_Move = { L, R }` 状态，松键即停，避免「按键卡住」。
- **帧率无关移动**：`update(deltaTime)` 中 `Speed = deltaTime * Car_Speed`，保证不同帧率下速度一致；横向移动以 `if (x >= -2)` / `if (x <= 2)` 限制边界。
- **触发器而非碰撞器**：终点 `wall` 作为**感应区**而非实体墙，使用 `onTriggerEnter` 只发通知、不产生物理弹开，语义更干净、性能更轻。
- **事件绑定与清理**：`onLoad` 中 `input.on` 与 `Collider.on` 绑定监听，`onDestroy` 中对应 `off` 解绑，防止内存泄漏与重复触发。
- **场景重载**：`restart()` 调用 `director.loadScene("Car")` 重置全部状态。

---
