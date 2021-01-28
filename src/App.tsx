import React, { useState } from 'react';
import './App.css';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-scroll';
import ReactCanvasNest from 'react-canvas-nest'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        select: {
            paddingTop: '50px',
            textAlign: 'center',
        },
        tabroot: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        code: {
            '& > *': {
                margin: theme.spacing(1),
                width: '12ch',
            },
        }
    }),
);

const words_encode: string[][] = [
    ["5pyJ5ZCR44Kw44Op44OV", "5LiJ6KeS6Zai5L+C"],
    ["VW5pb24tRmluZA==", "44Kv44Op44K544K/44O8"],
    ["5rex44GV5YSq5YWI5o6i57Si", "44OA44Kk44Kv44K544OI44Op5rOV"],
    ["UGFrZW4=", "S0NMQw=="],
    ["5LqM5YiG5o6i57Si", "57ea5b2i5o6i57Si"],
    ["QklU", "44K744Kw44Oh44Oz44OI5pyo"],
    ["44Ov44O844K344Oj44Or44OV44Ot44Kk44OJ", "44OZ44Or44Oe44Oz44OV44Kp44O844OJ"],
    ["44OP44OW56m65riv", "44Km44OL44Kw44Op44OV"],
    ["5bmF5YSq5YWI5o6i57Si", "5rex44GV5YSq5YWI5o6i57Si"],
    ["U3RhY2s=", "UXVldWU="],
    ["c2V0", "cHJpb3JpdHlfcXVldWU="],
    ["Y2hva3VkYWk=", "cm5nXzU4"],
    ["U3BhcmVCZWF0", "QXJjYWVh"],
    ["5bmz5pa55YiG5Ymy", "44K744Kw44Oh44Oz44OI5pyo"],
    ["44OR44Oz44Kx44O844Kt", "44OB44O844K644Kx44O844Kt"],
    ["6J+75pys", "6IGW5pu4"],
    ["Qysr", "UHl0aG9u"],
    ["54mH5oCd44GE", "5aSx5oGL"],
    ["57WQ5ama", "5ZCM5qOy"],
    ["5Luu6KOF", "5aWz6KOF"],
    ["44Oe44OD44OB44Oz44Kw44Ki44OX44Oq", "44Oe44OD44OB44Oz44Kw5ZWP6aGM"],
    ["Tmlt", "5qSF5a2Q5Y+W44KK44Ky44O844Og"],
    ["44OR44K944Kz44Oz56CU56m26YOo", "44OR44K644Or56CU56m26YOo"],
    ["UGFuYXNvbmlj", "SElUQUNISQ=="],
    ["QXRDb2Rlcg==", "Q29kZWZvcmNlcw=="],
    ["44KK44KT44GU", "44Kv44Oq"],
    ["5bCP57Gg5YyF", "44K344Ol44Km44Oe44Kk"],
    ["R29vZ2xl", "WWFob28="],
    ["QXRDb2Rlcg==", "Sk9J"],
    ["55uG6LiK44KK", "44Op44K444Kq5L2T5pON"],
    ["Z290b+aWhw==", "R290b+aUv+etlg=="],
    ["44GX44GK44KA44GZ44Gz", "6LWk6aOv"],
    ["V29yZA==", "VGV4"],
    ["VmlzdWFsIFN0dWRpbw==", "VmlzdWFsIFN0dWRpbyBDb2Rl"],
    ["UWlpdGE=", "SGF0ZW5hIEJsb2c="],
    ["6YWN5YiX5aSW5Y+C54Wn", "6Zu76LuK44Gu44Kq44O844OQ44O844Op44Oz"],
    ["TWFjIE9T", "44Oe44Kv44OJ44OK44Or44OJ"],
    ["6aOb6KGM5qmf", "5paw5bm557ea"],
    ["44OH44Kj44K644OL44O844Op44Oz44OJ", "VVNK"],
    ["44OB44On44Kz44Os44O844OI", "44Kt44Oj44Op44Oh44Or"],
    ["44Os44OD44OJ44Kz44O844OA44O8", "54Gw6Imy44Kz44O844OA44O8"],
    ["44OR44K944Kz44Oz", "44K544Oe44Ob"],
    ["VHdpdHRlcg==", "RGlzY29yZA=="],
    ["VHdpdHRlcg==", "44Kk44Oz44K544K/44Kw44Op44Og"],
    ["V2luZG93cw==", "TWFj"],
    ["V2luZG93cw==", "VWJ1bnR1"],
    ["44OY44OD44OJ44Ob44Oz", "44Kk44Ok44Ob44Oz"],
    ["5pWw5a2m", "5oOF5aCx56eR5a2m"],
    ["5pep6Kej44GN", "5pep5oq844GX"],
    ["5ZOB6Kme5YiG6Kej", "57Sg5Zug5pWw5YiG6Kej"],
    ["5Zue5paH77yI5L6L56S656aB5q2i77yJ", "5pep5Y+j6KiA6JGJ77yI5L6L56S656aB5q2i77yJ"],
    ["44Ov44O844OJ", "44Oh44Oi5biz"],
    ["44K/44Kk44OU44Oz44Kw", "6Z+z44Ky44O8"],
    ["44GL44GN5rC3", "44Ki44Kk44K544Kv44Oq44O844Og"],
    ["44K544Kk44Kr", "44Oh44Ot44Oz"],
    ["44Ks44K544OI", "44K144Kk44K844Oq44Ok"],
    ["56u25oqA44OX44Ot44Kw44Op44Of44Oz44Kw", "Q1RG"],
    ["56u25oqA44OX44Ot44Kw44Op44Of44Oz44Kw", "S2FnZ2xl"],
    ["5aSq6Zm9", "5pyI"],
];

const words: string[][] = words_encode.map((theme) => {
    return [decodeURIComponent(escape(window.atob(theme[0]))), decodeURIComponent(escape(window.atob(theme[1])))];
})

let playerNumData: number = 0, wolfNumData: number = 0;
let theme: number = 0;
let whichWolf: boolean = false, isWolf: boolean = false;
const sel = (num: number): JSX.Element[] => {
    let tmp: JSX.Element[] = [];
    for (let i = num; i < 11; i++) {
        tmp.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
    }
    return tmp;
}
let inviteCodeData: string = "";
let indexData: number = 0;
function App() {
    const classes = useStyles();
    const [playerNum, setPlayerNum] = useState<number>(0);
    const [wolfNum, setWolfNum] = useState<number>(0);
    const playerNumSelect: JSX.Element[] = sel(3);
    const indexSelect: JSX.Element[] = sel(1);
    const [wolfNumSelect, setWolfNumSelect] = useState<JSX.Element[]>();
    const changePlayersNum = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: number = event.target.value as number;
        const tmp: JSX.Element[] = [];
        for (let i = 1; i <= (x - 1) / 2; i++) {
            tmp.push(
                <MenuItem value={i} key={i}>{i}</MenuItem>
            );
        }
        setPlayerNum(x);
        playerNumData = x;
        if (wolfNum > (x - 1) / 2) {
            setWolfNum(0);
            wolfNumData = 0;
        }
        setWolfNumSelect(tmp);
        setIsFinished(false);
        setReceived(false);
    };
    const changeWolfNum = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: number = event.target.value as number;
        setWolfNum(x);
        setIsFinished(false);
        setReceived(false);
        wolfNumData = x;
    };
    const setWolf = (): boolean[] => {
        let wolf: boolean[] = [];
        let rem = wolfNumData;
        for (let i = 0; i < playerNumData; i++) {
            let x: number = Math.floor(Math.random() * (playerNumData - i));
            if (x < rem) {
                wolf.push(true);
                rem--;
            } else {
                wolf.push(false);
            }
        }
        return wolf;
    };
    const generateCode = (): string => {
        whichWolf = Math.floor(Math.random() * 2.) == 1;
        theme = Math.floor(Math.random() * words.length);
        let wolf: boolean[] = setWolf();
        isWolf = wolf[0];
        let code: number = (whichWolf ? 1 : 0);
        code <<= 7;
        code += theme;
        code <<= 10;
        for (let i = 0; i < 10; i++) {
            if (i < playerNumData) {
                code += (1 << i) * (wolf[i] ? 1 : 0);
            } else {
                if (Math.floor(Math.random() * 2) == 1) {
                    code += (1 << i);
                }
            }
        }
        code *= 0x3392;
        code %= 0x4a26f;
        let pass: string = "";
        for (let i = 0; i < 4; i++) {
            if (code % 36 < 10) {
                pass += String.fromCharCode(0x30 + code % 36);
            }
            else {
                pass += String.fromCharCode(0x61 + (code % 36 - 10));
            }
            code = Math.floor(code / 36 + 0.001);
        }
        setReceived(true);
        setIsFinished(false);
        setInviteCode(pass);
        inviteCodeData = pass;
        return pass;
    }
    const decoding = (pass: string, index: number): boolean => {
        if (pass.length != 4) {
            return false;
        }
        let code: number = 0;
        for (let i = 3; i >= 0; i--) {
            code *= 36;
            if ('0' <= pass[i] && pass[i] <= '9') {
                code += pass.charCodeAt(i) - 0x30;
            } else if ('a' <= pass[i] && pass[i] <= 'z') {
                code += pass.charCodeAt(i) - 0x61 + 10;
            } else {
                return false;
            }
        }
        code *= 0x493c9;
        code %= 0x4a26f;
        if (code >= (1 << 18)) {
            return false;
        }
        let x = (code >> 10) & ((1 << 7) - 1);
        if (x >= words.length) return false;
        theme = x;
        whichWolf = ((code >> 17 & 1) ? true : false);
        isWolf = ((code >> (index - 1) & 1) ? true : false);
        return true;
    }

    const [tabVal, setTabVal] = useState<number>(0);
    const tabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabVal(newValue);
    }
    const [genDialog, setGenDialog] = useState<boolean>(false);
    const [genMessage, setGenMessage] = useState<string>("");
    const [invDialog, setInvDialog] = useState<boolean>(false);
    const [inviteCode, setInviteCode] = useState<string>("");
    const [inviteIndex, setInviteIndex] = useState<number>(0);
    const [received, setReceived] = useState<boolean>(false);
    const [inviteOK, setInviteOK] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [finDialog, setFinDialog] = useState<boolean>(false);
    const changeInviteCode = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: string = event.target.value as string;
        setInviteCode(x);
        inviteCodeData = x;
        setIsFinished(false);
        setReceived(false);
        if (inviteIndex) {
            if (decoding(x, indexData)) {
                setInviteOK(true);
            } else {
                setInviteOK(false);
            }
        } else {
            setInviteOK(false);
        }
    }
    const changeInviteIndex = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: number = event.target.value as number;
        setInviteIndex(x);
        indexData = x;
        setIsFinished(false);
        setReceived(false);
        if (decoding(inviteCodeData, x)) {
            setInviteOK(true);
        } else {
            setInviteOK(false);
        }
    }
    return (
        <div className="App">
            <Link activeClass="active" to="game" smooth={true} duration={700} className="scroll">
                <div id="top">
                    <ReactCanvasNest
                        config={{ pointR: 2, lineColor: '255,255,255', pointColor: '247,198,235', count: 30 }}
                        style={{ zIndex: 100 }} />
                    <div className="title">
                        <h1>競プロワードウルフ</h1>
                        <h3>in Paken Camp 2020</h3>
                    </div>
                    <p>Tap to Start</p>
                </div>
            </Link>
            <div id="game">
                <div className={classes.tabroot}>
                    <AppBar position="static">
                        <Tabs value={tabVal} onChange={tabChange} variant="fullWidth">
                            <Tab label="Generate" />
                            <Tab label="Receive" />
                        </Tabs>
                    </AppBar>
                </div>
                {tabVal == 0 ?
                    <div id="select">
                        <div className={classes.select}>
                            <h3>プレイヤーの人数と、ウルフの人数を選択して下さい</h3>
                            <FormControl className={classes.formControl}>
                                <InputLabel>プレイヤー人数</InputLabel>
                                <Select value={playerNum} onChange={changePlayersNum}>
                                    {playerNumSelect}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl} disabled={!playerNum}>
                                <InputLabel>ウルフの人数</InputLabel>
                                <Select value={wolfNum} onChange={changeWolfNum}>
                                    {wolfNumSelect}
                                </Select>
                            </FormControl>
                        </div>
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={() => { setGenDialog(true); setReceived(true); setGenMessage(generateCode()) }} disabled={wolfNum == 0}>Generate!</Button>
                        <Dialog open={genDialog} onClose={() => setGenDialog(false)}>
                            <DialogContent>
                                <DialogContentText>
                                    招待コード : {genMessage} <br />
                                    あなたのお題は、「{words[theme][(whichWolf ? 0 : 1) ^ (isWolf ? 1 : 0)]}」です。
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setGenDialog(false)}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    :
                    <div id="select">
                        <div className={classes.select}>
                            <h3>招待コードと番号を入力して下さい</h3>
                            <FormControl className={classes.formControl} >
                                <TextField value={inviteCode} onChange={changeInviteCode} label="Invite Code" />
                            </FormControl>
                            <FormControl className={classes.formControl} >
                                <InputLabel>Invite Number</InputLabel>
                                <Select value={inviteIndex} onChange={changeInviteIndex}>
                                    {indexSelect}
                                </Select>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={() => { setInvDialog(true); setReceived(true); }} disabled={inviteOK == false}>Receive!</Button>
                            <Dialog open={invDialog} onClose={() => setInvDialog(false)}>
                                <DialogContent>
                                    <DialogContentText>
                                        あなたのお題は、「{words[theme][(whichWolf ? 0 : 1) ^ (isWolf ? 1 : 0)]}」です。
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setInvDialog(false)}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                }
                {received ? (
                    <React.Fragment>
                        <br />
                        {isFinished ? (
                            <div>
                                <h3>
                                    ウルフ : {words[theme][(whichWolf ? 1 : 0)]} <br /><br />
                                    市民 : {words[theme][(whichWolf ? 0 : 1)]}
                                </h3>
                            </div>
                        )
                            : (
                                <React.Fragment>
                                    <Button variant="contained" color="secondary" onClick={() => setFinDialog(true)}>解答を表示</Button>
                                    <Dialog open={finDialog} onClose={() => setFinDialog(false)}>
                                        <DialogContent>
                                            <DialogContentText>
                                                ゲームを終了し、解答を表示します。よろしいですか？
                                    </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setFinDialog(false)}>Cancel</Button>
                                            <Button onClick={() => { setFinDialog(false); setIsFinished(true); }}>OK</Button>
                                        </DialogActions>
                                    </Dialog>
                                </React.Fragment>
                            )}

                    </React.Fragment>
                ) : null}
                <br /><br />
                <div style={{ "position": "absolute", "top": "6ch","marginLeft":"auto","marginRight":"auto","width":"100%" }} >
                    <a href="/sub#sub-select">非招待コード制バージョン</a>
                </div>
            </div>
        </div>
    );
}

export default App;
