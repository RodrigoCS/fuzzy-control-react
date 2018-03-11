export const primaryColor = '#6772e5'
export const secondaryColor = '#3ecf8e'
export const dataColor = "#05d5ff"

export const TRIANGLE = 0
export const TRIANGLE_LEFT = 1
export const TRIANGLE_RIGHT = 2
export const TRAPEZOID = 3
export const TRAPEZOID_LEFT = 4
export const TRAPEZOID_RIGHT = 5

export const YStateMachine = {
    [TRIANGLE]: [0, 100, 0],
    [TRIANGLE_LEFT]: [100, 0],
    [TRIANGLE_RIGHT]: [0, 100],
    [TRAPEZOID]: [0, 100, 100, 0],
    [TRAPEZOID_LEFT]: [100, 100, 0],
    [TRAPEZOID_RIGHT]: [0, 100, 100]
}

export const MIN = 0
export const MAX = 1