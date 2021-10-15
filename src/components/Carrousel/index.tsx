import { CarouselProps, CarouselState } from "./types";
import React from "react";
import { noop, factoryComponent, classes } from './types/utils'
import './style/carrousel.scss'


export default class Carousel extends React.Component<CarouselProps, CarouselState> {

    private assignParOrInpar(index: number): string {
        if (index % 2) return 'par'
        return ''
    }

    private assignLastNumber(index: number): string {
        const lastIndex = 2 + (this.state.tabsLimitShow * 2)
        if (this.state.isLastNumberStyle) {
            if (index === 0 || index === lastIndex) return `last-numbers ${index === 0 ? 'left' : 'right'}`
            if (index === 1 || index === (lastIndex - 1)) return `pre-last-numbers ${index === 1 ? 'left' : 'right'}`
        }
        return ''
    }

    private assignSelect(number: number): string {


        if (number === this.state.tabsLimitShow + 1 && !this.state.isTransition) return 'select'

        return 'unpicked'
    }

    private validatorNextNumber(numberGo: number, numberNow: number, numberMax: number, sum: number): number {
        if (sum > numberMax) return this.validatorNextNumber(numberGo, numberNow, numberMax, (sum - numberMax))
        if (sum <= 0) return this.validatorNextNumber(numberGo, numberNow, numberMax, (sum + numberMax))
        return sum
    }

    foward(key: number) {
        console.log(key)
        const context = this;
        const xTranslateBase = -188;

        const { state } = context
        const { tabsShow, tabSelect } = state
        context.setState({ isTransition: true, transitionMake: (xTranslateBase * key) })
        setTimeout(() => {
            const sum = (tabSelect + key);
            context.setState({ tabSelect: this.validatorNextNumber(key, tabSelect, tabsShow, sum), isTransition: false })

        }, 800)
    }
    previous(key: number) {
        console.log(key)
        const context = this;
        const xTranslateBase = 188;
        const { state } = context
        const { tabsShow, tabSelect } = state
        context.setState({ isTransition: true, transitionMake: (xTranslateBase * key) })
        setTimeout(() => {
            const sum = (tabSelect - key);
            context.setState({ tabSelect: this.validatorNextNumber(key, tabSelect, tabsShow, sum) })
            context.setState({ isTransition: false })

        }, 800)
    }
    static defaultProps: CarouselProps = {
        autoPlay: false,
        onClickItem: noop,
        onChange: noop,
        isLastNumberStyle: false,
        tabsShow: 0,
        tabsLimitShow: 0,
        tabSelect: 0,

    }

    constructor(props: CarouselProps) {
        super(props)
        const initState = {
            autoPlay: false,
            isLastNumberStyle: false,
            isTransition: false,
            tabsShow: 4,
            tabsLimitShow: 2,
            tabSelect: 4,
            transitionMake: 0,
            
        }
        this.state = {
            ...initState,
        }

    }


    render() {
        const { tabSelect, tabsLimitShow, tabsShow, transitionMake } = this.state;
        const numberSelect = tabsLimitShow + 1;
        return (
            <div className="carousel-main">

                {
                    factoryComponent(tabSelect, tabsLimitShow, tabsShow, []).map((number, key) => (
                        <div key={key} onClick={() => { key > numberSelect ? this.foward((key - numberSelect)) : key < numberSelect ? this.previous(numberSelect - key) : console.log('arroba') }} className='pre-body'>

                            {numberSelect === key && <div onClick={() => { this.previous(1) }} className='arrow-left'></div>}
                            {numberSelect === key && <div onClick={() => { this.foward(1) }} className='arrow-right'></div>}

                            <div className={classes('body-number', this.assignSelect(key))}>
                                <div
                                    className={classes('number', this.assignParOrInpar(number), this.assignSelect(key), this.assignLastNumber(key), this.state.isTransition ? 'trans' : '')
                                    }
                                    style={{ transform: `translateX(${this.state.isTransition ? transitionMake + 'px' : '0px'})` }}
                                ><div>{number}</div></div>

                            </div>
                        </div>
                    ))
                }

            </div>

        )
    }

}