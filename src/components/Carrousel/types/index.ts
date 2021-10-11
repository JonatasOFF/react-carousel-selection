export interface CarouselState {

    autoPlay: boolean;

    tabsShow: number;
    tabsLimitShow: number;
    tabSelect: number;
    transitionMake: number;
    isTransition: boolean;
    
}
export interface CarouselProps {
    autoPlay?: boolean;
    onClickItem: (index: number, item: React.ReactNode) => void;
    onChange: (index: number, item: React.ReactNode) => void;

    tabsShow: number;
    tabsLimitShow: number;
    tabSelect: number;
}