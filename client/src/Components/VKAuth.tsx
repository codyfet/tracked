import React, {Component} from "react";
import {Redirect} from "react-router-dom";

interface IProps {
    disabled?: boolean;
    callback?: Function;
    apiId: string;
    containerStyle?: Object;
    className?: string;
}

interface IState {
    isLoaded: boolean;
    isProcessing: boolean;
    redirectToMain: boolean;
}

interface VKAuthResponse {
    uid: number;
    first_name: string;
    last_name: string;
    photo: string;
    photo_rec: string;
    hash: string;
}

class VkAuth extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoaded: false,
            isProcessing: false,
            redirectToMain: false,
        };
    }

    componentDidMount() {
        document.getElementById("vk-sdk") ? this.sdkLoaded() : null;
        this.asyncInit();
        this.loadSdkAsync();
    }

    asyncInit() {
        const {apiId} = this.props;
        window.vkAsyncInit = () => {
            window.VK.init({apiId});
            window.VK.Widgets.Auth("vk_auth", {
                onAuth: (response: VKAuthResponse) => {
                    console.log(response);

                    this.setState({redirectToMain: true});
                },
            });
            this.setState({isLoaded: true});
        };
    }

    sdkLoaded() {
        this.setState({isLoaded: true});
    }

    loadSdkAsync() {
        const el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "https://vk.com/js/api/openapi.js?169";
        el.async = true;
        el.id = "vk-sdk";
        document.getElementsByTagName("head")[0].appendChild(el);
    }

    checkLoginState = (response: any) => {
        // TODO:
        this.setState({isProcessing: false});

        this.props.callback ? this.props.callback(response) : null;
    };

    handleClick = () => {
        if (!this.state.isLoaded || this.state.isProcessing || this.props.disabled) {
            return;
        }
        this.setState({isProcessing: true});
        // window.VK.Auth.login(this.checkLoginState);
    };

    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {disabled, callback, apiId, containerStyle, ...buttonProps} = this.props;
        return this.state.redirectToMain ? (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        ) : (
            <span style={containerStyle}>
                <button {...buttonProps} onClick={this.handleClick}></button>
            </span>
        );
    }
}

// VkAuth.propTypes = {
//     disabled: PropTypes.bool,
//     callback: PropTypes.func.isRequired,
//     apiId: PropTypes.string.isRequired,
//     containerStyle: PropTypes.object,
// };

export default VkAuth;
