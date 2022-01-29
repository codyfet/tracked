import React, {useEffect} from "react";

/**
 * Id контейнера, куда положим виджет авторизации.
 */
const VK_AUTH_WIDGET_CONTAINER_ID: string = "vk_auth";

/**
 * Id контейнера, куда положим скрипт с api vk.
 */
const VK_OPENAPI_CONTAINDER_ID: string = "vk_api_script";

export interface VKAuthResponse {
    uid: number;
    first_name: string;
    last_name: string;
    photo: string; // Ширина 200 px
    photo_rec: string; // Ширина 50px
    hash: string;
}

interface IProps {
    authCallback?: (response: VKAuthResponse) => void;
    apiId: number;
}

/**
 * Компонент обертка для VKAuth виджета
 * Асинхронно подгружает скрипт с апи VK и инициализирует VK Auth виджет.
 *
 * OpenAPI от ВК описано здесь https://vk.com/dev/openapi
 * Виджет авторизации описан здесь https://vk.com/dev/Login
 */
export const VKAuthWidget = ({authCallback, apiId}: IProps) => {
    useEffect(() => {
        initialize();
    }, []);

    /**
     * Асинхронно загружает скрипт с api для вк.
     */
    const loadScriptAsync = () => {
        const el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "https://vk.com/js/api/openapi.js?169";
        el.async = true;
        el.id = VK_OPENAPI_CONTAINDER_ID;
        document.getElementsByTagName("head")[0].appendChild(el);
    };

    /**
     * Инициализация VK Auth виджета.
     */
    const vkInit = () => {
        window.VK.init({apiId});
        window.VK.Widgets.Auth(VK_AUTH_WIDGET_CONTAINER_ID, {
            onAuth: (response: VKAuthResponse) => {
                console.log(response);

                if (authCallback) {
                    authCallback(response);
                }
            },
        });
    };

    const initialize = () => {
        if (!document.getElementById(VK_AUTH_WIDGET_CONTAINER_ID)) {
            throw new Error("Нет контейнера для загрузки виджетa");
        }

        /**
         * Если скрипт еще не был загружен, то загружает скрипт и инициализирует виджет сразу после
         * асинхронной загрузки скрипта при помощи специальной функци vkAsyncInit, которая вызывается в скрипте.
         * Если уже загружен - то просто инициализируем виджет.
         */
        if (!document.getElementById(VK_OPENAPI_CONTAINDER_ID)) {
            loadScriptAsync();
            window.vkAsyncInit = vkInit;
        } else {
            vkInit();
        }
    };

    return <div id={VK_AUTH_WIDGET_CONTAINER_ID}></div>;
};
