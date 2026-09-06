import { randomRangeInt } from 'cc';

// [优化9] 纯逻辑模块：与引擎组件解耦，跨文件 import / export 复用
// 同时让项目具备「自己写的模块互相 import」的 ES Module 实践（简历可佐证）

/** 帧率无关步进：每帧位移 = 速度 × 帧间隔 */
export function frameIndependentStep(speed: number, deltaTime: number): number {
    return speed * deltaTime;
}

/** 第 level 关的目标分：第 1 关 4，其后每关 +2（4 / 6 / 8 / 10） */
export function targetScoreFor(level: number): number {
    return 4 + (level - 1) * 2;
}

/** 下一支箭的飞行时长：基准 ± 随机扰动，最小钳制避免 0 / 负值导致瞬移 */
export function nextFlightDuration(base: number): number {
    return Math.max(0.05, base + randomRangeInt(-20, 20) / 100);
}
