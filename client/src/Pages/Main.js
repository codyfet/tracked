import React from "react";
import {Grid, Image} from "semantic-ui-react";

/**
 * Главная страница приложения.
 */
export const Main = () => {
    // return (
    //     <div className="main-page">
    //         <div className="main-page-tape">
    //             <Image src={"../src/Assets/tape.png"} />
    //         </div>
    //         <div className="main-page-text">
    //             <div className="text">Журнал для учёта просмотренных фильмов и сериалов</div>
    //             <div className="start-button">
    //                 <Button as={Link} to="/login" key="login" color="green">
    //                     Начать
    //                 </Button>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <>
            <Grid className="main-page_" columns={2} textAlign="center">
                <Grid.Row>
                    <Grid.Column className="left-panel">

                        <div id="grid-posters">
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/1e63cd04450927f3c8f5c15fcf04ba57.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/05c4e5ea9b48cc2b61b20603c9ef44ae.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/84d3a0c41acd7fc4f6662fc46972b399.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/6b9ecd098b7982942ed069d183b080b4.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/6fa82cc20fde6afbbfc66634b5f39497.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/38b7327de3de17d91b8038a1cdb6a857.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/50e3c529b20f5ed216b0a565c7bacfab.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/74a977a75227db55dbfb366b4ca02735.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/84d3a0c41acd7fc4f6662fc46972b399.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/8951b8ea2d9a3b58471434e0287e4dab.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/a9be21a939239968b0de6cea60ff82f7.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/b4f63e2df3e48f776b94da2b2c43802a.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/b24fcc758179457d461f80c7c78df687.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/bfb5dd7a605d1cdc6b5469219650ae06.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/c21a10958f8eb866df4b8975801c642e.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/d113d2ea3f7f318950c1b432cd85213b.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/e54a161c89391160a097dacf3ca1255e.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/e570fe42cfd07ae505321c244d7db63c.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/ed2674fe926487fabaa3a3f67d7a1ae5.jpg"} /></div>
                            <div><Image className="main-poster" size="small" src={"../src/Assets/posters/f0aa16eef3aeda8e76cfadc7c8ad1a88.jpg"} /></div>
                        </div>
                    </Grid.Column>
                    <Grid.Column className="right-panel">
                        <div className="main-text">
                            <div className="main-text-block">
                                <span className="logo">tracked</span>
                                <div className="desc">Сервис для учёта просмотренных фильмов и сериалов.</div>
                            </div>
                        </div>
                        <div className="items">
                            <div className="item-wrapper">
                                <span className="movies">Фильмы.</span>
                            </div>
                            <div className="item-wrapper">
                                <span className="rates">Оценки.</span>
                            </div>
                            <div className="item-wrapper">
                                <span className="stats">Статистика.</span>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};
