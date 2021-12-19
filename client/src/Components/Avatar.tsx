import React, {ChangeEvent, useRef} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "../Actions/Actions";
import {convertToBase64} from "../Utils/Utils";
import {Image} from "semantic-ui-react";
import {Plus} from "./Icons/Plus";

/**
 * Изображение в формате base64.
 */
interface IProps {
    image: string;
    readonly: boolean;
}

/**
 * КОомпонент аватар пользвоателя. Позволяет загрузить фото в режиме editable (если это аватар текущего полтьзователя)
 * и просмотреть аватар в non-editable режиме (если это аватар другого пользователя).
 */
export const Avatar = ({image, readonly}: IProps) => {
    const dispatch = useDispatch();

    /**
     * Ссылка на инпут для загрузки аватара.
     */
    const inputFileAvatar = useRef<HTMLInputElement>(null);

    /**
     * Обработчик загрузки фотографии.
     */
    const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file: File = (event.target as HTMLInputElement).files[0];

        if (file.size > 100000) {
            alert("Размер фото не должен превышать 100кб");
            return;
        }

        convertToBase64(file, (base64file: string) => {
            dispatch(
                updateUser({
                    image: base64file,
                })
            );
        });
    };

    /**
     * Обработчик нажатия на область аватара.
     */
    const handleAvatarClick = () => {
        if (readonly) {
            return;
        }
        inputFileAvatar.current.click();
    };

    return (
        <>
            {image ? (
                <div className={`profile-data-image-wrapper ${!readonly ? "editable" : ""}`}>
                    <Image
                        className="profile-data-image"
                        src={image}
                        circular
                        onClick={handleAvatarClick}
                    />
                </div>
            ) : (
                <div className="profile-data-image avatar-placeholder" onClick={handleAvatarClick}>
                    <Plus />
                </div>
            )}

            {!readonly && (
                <input
                    id="avatar"
                    type="file"
                    onChange={handleUploadFile}
                    hidden
                    ref={inputFileAvatar}
                />
            )}
        </>
    );
};
