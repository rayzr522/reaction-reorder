const prefixWith = prefix => it => prefix + it

const reorderReactions = (input, target) => {
    const toRemoveAtStart = input.includes(target[0])
        ? input.slice(0, input.indexOf(target[0]))
        : input

    const alignedInput = input.slice(toRemoveAtStart.length)

    const {steps, remainder} = target.reduce(
        ({steps, remainder}, next) => {
            if (remainder[0] === next) {
                return {
                    steps,
                    remainder: [...remainder.slice(1)]
                }
            } else {
                const indexOfNext = remainder.indexOf(next)

                if (indexOfNext > -1) {
                    return {
                        steps: [
                            ...steps,
                            ...remainder.slice(0, indexOfNext).map(prefixWith('-'))
                        ],
                        remainder: [...remainder.slice(indexOfNext + 1)]
                    }
                } else {
                    return {
                        steps: [
                            ...steps,
                            ...remainder.map(prefixWith('-')),
                            '+' + next,
                        ],
                        remainder: []
                    }
                }
            }
        },
        { steps: [], remainder: alignedInput }
    )

    return [
        ...toRemoveAtStart.map(prefixWith('-')),
        ...steps,
        ...remainder.map(prefixWith('-'))
    ]
}

module.exports = {
    prefixWith,
    reorderReactions
}
