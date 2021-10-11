export const factoryComponent = (currentNumber: number, tabsLimitShow: number, tabsLimit: number, currentList: number[]): number[] => {
    const list = [];
    let nextNumber: number = currentNumber;
    let previousNumber: number = currentNumber;
    list.push(currentNumber);
    

    function isNextOverextended(): void {
        if (nextNumber > tabsLimit) nextNumber -= tabsLimit
    }
    function isPrevOverextended(): void {
        if (previousNumber < 1) previousNumber = tabsLimit
    }

    for (let i = 0; i <= tabsLimitShow; i++) {
        ++nextNumber
        --previousNumber
        isPrevOverextended()
        isNextOverextended()
        list.push(nextNumber)
        list.unshift(previousNumber)
    }

    return list
}

export const noop = () => { }

export const classes = (...classes: string[]): string => {return classes.join(" ")}