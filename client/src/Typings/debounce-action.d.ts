declare module "debounce-action" {
    function debounceAction(
        action: Function,
        wait: number,
        options: DebounceSettings
    ): {
        (...actionArgs: any): (dispatch: Dispatch) => any;
        cancel: () => void;
        flush: () => any;
    };

    export = debounceAction;
}
