const {prefixWith, reorderReactions} = require('.')

const BASIC_ARRAY = ['A', 'B', 'C', 'D']

describe('reorderReactions', () => {
    it('handles empty input', () => {
        expect(
            reorderReactions(
                [],
                []
            )
        ).toStrictEqual(
            []
        )
    })
    it('does nothing when input & target match', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                BASIC_ARRAY
            )
        ).toStrictEqual(
            []
        )
    })
    it('adds all when going from empty to non-empty', () => {
        expect(
            reorderReactions(
                [],
                BASIC_ARRAY
            )
        ).toStrictEqual(
            BASIC_ARRAY.map(prefixWith('+'))
        )
    })
    it('removes all when going from non-empty to empty', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                []
            )
        ).toStrictEqual(
            BASIC_ARRAY.map(prefixWith('-'))
        )
    })
    it('handles an insertion on the end', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                [...BASIC_ARRAY, 'E']
            )
        ).toStrictEqual(
            ['+E']
        )
    })
    it('handles an insertion at the start', () => {
        const arrayWithE = ['E', ...BASIC_ARRAY]

        expect(
            reorderReactions(
                BASIC_ARRAY,
                arrayWithE,
            )
        ).toStrictEqual(
            [
                ...BASIC_ARRAY.map(prefixWith('-')),
                ...arrayWithE.map(prefixWith('+'))
            ]
        )
    })
    it('handles an insertion in the middle', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                ['A', 'B', 'X', 'C', 'D']
            )
        ).toStrictEqual(
            [
                '-C',
                '-D',
                '+X',
                '+C',
                '+D'
            ]
        )
    })
    it('handles multiple insertions in the middle', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                ['A', 'B', 'X', 'Y', 'C', 'D']
            )
        ).toStrictEqual(
            [
                '-C',
                '-D',
                '+X',
                '+Y',
                '+C',
                '+D'
            ]
        )

        expect(
            reorderReactions(
                BASIC_ARRAY,
                ['A', 'B', 'X', 'C', 'Y', 'D']
            )
        ).toStrictEqual(
            [
                '-C',
                '-D',
                '+X',
                '+C',
                '+Y',
                '+D'
            ]
        )

        expect(
            reorderReactions(
                BASIC_ARRAY,
                ['A', 'B', 'C', 'X', 'Y', 'D']
            )
        ).toStrictEqual(
            [
                '-D',
                '+X',
                '+Y',
                '+D'
            ]
        )
    })
    it('handles insertions on all ends at once', () => {
        const input = ['X', 'A', 'B', 'Y', 'Z', 'C', 'D', 'W']
        expect(
            reorderReactions(
                BASIC_ARRAY,
                input
            )
        ).toStrictEqual(
            [
                ...BASIC_ARRAY.map(prefixWith('-')),
                ...input.map(prefixWith('+'))
            ]
        )
    })
    it('handles deletions at the start', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                BASIC_ARRAY.slice(1),
            )
        ).toStrictEqual(
            [
                '-' + BASIC_ARRAY[0]
            ]
        )
    })
    it('handles deletions at the end', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                BASIC_ARRAY.slice(0, BASIC_ARRAY.length - 1)
            )
        ).toStrictEqual(
            [
                '-' + BASIC_ARRAY[BASIC_ARRAY.length - 1]
            ]
        )
    })
    it('handles deletions in the middle', () => {
        expect(
            reorderReactions(
                BASIC_ARRAY,
                ['A', 'B', 'D']
            )
        ).toStrictEqual(
            [
                '-C'
            ]
        )
    })
    it('handles deletions throughout', () => {
        expect(
            reorderReactions(
                ['X', 'A', 'B', 'Y', 'C', 'Z', 'D', 'W'],
                BASIC_ARRAY
            )
        ).toStrictEqual(
            [
                '-X', '-Y', '-Z', '-W'
            ]
        )
    })
})
