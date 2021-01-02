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
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        nameinput: {
            '& > *': {
                margin: theme.spacing(1),
                width: 'min(70vw,25ch)',
            },
        },
        numberselect: {
            paddingTop: '50px',
            textAlign: 'center',
        },
        eachtheme: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > *': {
                margin: '1px',
                width: theme.spacing(25),
                height: theme.spacing(25),
                padding: theme.spacing(1),
                boxSizing: 'border-box',
                fontFamily: 'heisei-maru-gothic-std, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '2ch',
                overflow: 'hidden',
                ['@media (max-width:500px)']: {
                    width: theme.spacing(18),
                    height: theme.spacing(18),
                    fontSize: '1.2ch',
                },
                ['@media (max-width:375px)']: {
                    width: theme.spacing(15),
                    height: theme.spacing(15),
                    fontSize: '1ch',
                },
            },
        },
        paper: {
            width: '100%',
            height: '100%',
            paddingTop: theme.spacing(10),
            boxSizing: 'border-box',
            cursor: 'pointer',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            overflow: 'hidden',
            ['@media (max-width:500px)']: {
                paddingTop: theme.spacing(7),
            },
            ['@media (max-width:375px)']: {
                paddingTop: theme.spacing(6),
            },
        },
        notused: {
            background: '#fff',
        },
        used: {
            background: '#c3e6cb',
        },
        wolf: {
            background: '#f5c6cb',
        },
        citizen: {
            background: '#9ad59e',
        },
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

let isOpened: boolean[] = [];
let isWolf: number[] = [];
let theme: number = 0;
let whichWolf: number = 0;
function App() {
    const classes = useStyles();
    const [playerNum, setPlayerNum] = useState<number>(0);
    const [wolfNum, setWolfNum] = useState<number>(0);
    const [players, setPlayers] = useState<string[]>([]);
    //const [isWolf, setIsWolf] = useState<number[]>([]);
    //const [theme, setTheme] = useState<number>(0);
    //const [whichWolf, setWhichWolf] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    //const [isOpened, setIsOpened] = useState<boolean[]>([]);
    const [eachTheme, setEachTheme] = useState<JSX.Element[]>([]);
    const [nowOpen, setNowOpen] = useState<boolean[]>([]);
    const [finishOpen, setFinishOpen] = useState<boolean>(false);
    const [playerNumSelect, setPlayerNumSelect] = useState<JSX.Element[]>(() => {
        let tmp: JSX.Element[] = [];
        for (let i = 3; i < 11; i++) {
            tmp.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
        }
        return tmp;
    });
    const [wolfNumSelect, setWolfNumSelect] = useState<JSX.Element[]>();
    const [playersInput, setPlayersInput] = useState<JSX.Element[]>();
    const changePlayersNum = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: number = event.target.value as number;
        let pla: string[] = players;
        while (pla.length > x) pla.pop();
        for (let i = playerNum + 1; i <= x; i++) {
            pla.push("プレイヤー" + i);
        }
        const tmp: JSX.Element[] = [];
        for (let i = 1; i <= (x - 1) / 2; i++) {
            tmp.push(
                <MenuItem value={i} key={i}>{i}</MenuItem>
            );
        }
        const tmp2: JSX.Element[] = [];
        let used: boolean[] = [];
        let used2: boolean[] = [];
        for (let i = 0; i < x; i++) {
            used.push(false);
            used2.push(false);
            tmp2.push(
                <TextField label={"プレイヤー" + (i + 1)} value={pla[i]} onChange={changePlayersName(i)} key={i} />
            )
        }
        setPlayers(pla);
        setPlayerNum(x);
        if (wolfNum > (x - 1) / 2) setWolfNum(0);
        setWolfNumSelect(tmp);
        setPlayersInput(tmp2);
        isOpened = used;
        setNowOpen(used2);
        if (wolfNum !== 0) setWolf(x, wolfNum);
    };
    const changePlayersName = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
        let pla: string[] = players;
        pla[index] = event.target.value as string;
        let inp: JSX.Element[] = [];
        for (let i = 0; i < players.length; i++) {
            inp.push(
                <TextField label={"プレイヤー" + (i + 1)} value={pla[i]} onChange={changePlayersName(i)} key={i} />
            )
        }
        setPlayers(pla);
        setPlayersInput(inp);
    };
    const changeWolfNum = (event: React.ChangeEvent<{ value: unknown }>) => {
        let x: number = event.target.value as number;
        setWolfNum(x);
        setWolf(players.length, x);
    };
    const setWolf = (N: number, M: number) => {
        let wolf: number[] = [];
        for (let i = 0; i < N; i++) {
            let x: number = Math.floor(Math.random() * (N - i));
            if (x < M) {
                wolf.push(1);
                M--;
            } else {
                wolf.push(0);
            }
        }
        isWolf = wolf;
    };
    const gameStart = () => {
        setIsStarted(true);
        let inp: JSX.Element[] = [];
        let used: boolean[] = [];
        for (let i = 0; i < players.length; i++) {
            used.push(false);
            inp.push(
                <TextField label={"プレイヤー" + (i + 1)} value={players[i]} key={i} disabled />
            );
        }
        isOpened = used;
        setPlayersInput(inp);
        theme = Math.floor(Math.random() * words.length);
        whichWolf = Math.floor(2 * Math.random());
        dialogChange(nowOpen, used, -1);
        setWolf(players.length, wolfNum);
        setIsFinished(false);
    };
    const gameEnd = () => {
        setIsFinished(true);
        let eac: JSX.Element[] = [];
        for (let i = 0; i < players.length; i++) {
            if (isWolf[i]) {
                eac.push(
                    <div key={i}>
                        <Paper elevation={3} className={classes.wolf + " " + classes.paper}>{players[i]}</Paper>
                    </div>
                )
            } else {
                eac.push(
                    <div key={i}>
                        <Paper elevation={3} className={classes.citizen + " " + classes.paper}>{players[i]}</Paper>
                    </div>
                )
            }
        }
        setEachTheme(eac);
    }
    const finishDialogOpen = () => {
        setFinishOpen(true);
    }
    const finishDialogClose = () => {
        setFinishOpen(false);
    }
    const replay = () => {
        let inp: JSX.Element[] = [];
        for (let i = 0; i < players.length; i++) {
            inp.push(
                <TextField label={"プレイヤー" + (i + 1)} onChange={changePlayersName(i)} value={players[i]} key={i} />
            );
        }
        setPlayersInput(inp);
        setEachTheme(null);
        setIsStarted(false);
        setIsFinished(false);
    }
    const dialogChange = (op: boolean[], oped: boolean[], situ: number) => {
        let eac: JSX.Element[] = [];
        for (let i = 0; i < players.length; i++) {
            let message: string = (situ ?
                players[i] + "さんのお題は、「" + (words[theme][whichWolf ^ isWolf[i]]) + "」です。"
                : players[i] + "さんのお題を表示します。よろしいですか？"
            );
            let tmp: JSX.Element = (
                <React.Fragment>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {situ ?
                            <Button onClick={() => closeTheme(i)} color="primary">
                                OK
                            </Button>
                            :
                            <React.Fragment>
                                <Button onClick={() => closeTheme(i)} color="primary">
                                    Cancel
                            </Button>
                                <Button onClick={() => openTheme2(i)} color="primary">
                                    OK
                            </Button>
                            </React.Fragment>
                        }
                    </DialogActions>
                </React.Fragment>
            );
            if (situ === -1) {
                tmp = null;
            }
            let paper: JSX.Element = (oped[i] ?
                <Paper elevation={3} className={classes.used + " " + classes.paper} onClick={() => { openTheme(i); }}>{players[i]}</Paper>
                : <Paper elevation={3} className={classes.notused + " " + classes.paper} onClick={() => { openTheme(i); }}>{players[i]}</Paper>
            );
            if (op[i]) {
                eac.push(
                    <div key={i}>
                        <Dialog open={true} onClose={() => closeTheme(i)}>
                            {tmp}
                        </Dialog>
                        {paper}
                    </div>
                )
            } else {
                eac.push(
                    <div key={i}>
                        <Dialog open={false} onClose={() => closeTheme(i)}>
                            {tmp}
                        </Dialog>
                        {paper}
                    </div>
                );
            }
        }
        setEachTheme(eac);
    }
    const openTheme = (index: number) => {
        let x: boolean[] = nowOpen;
        x[index] = true;
        setNowOpen(x);
        dialogChange(x, isOpened, 0);
    };
    const openTheme2 = (index: number) => {
        let x: boolean[] = isOpened;
        x[index] = true;
        isOpened = x;
        dialogChange(nowOpen, x, 1);
    }
    const closeTheme = (index: number) => {
        let x: boolean[] = nowOpen;
        x[index] = false;
        setNowOpen(x);
        dialogChange(x, isOpened, -1);
    };
    return (
        <div className="App">
            <Link activeClass="active" to="select" smooth={true} duration={700} className="scroll">
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
            <div id="select">
                <div id="select_number" className={classes.numberselect}>
                    <h3>プレイヤーの人数と、ウルフの人数を選択して下さい</h3>
                    <FormControl className={classes.formControl} disabled={isStarted}>
                        <InputLabel>プレイヤー人数</InputLabel>
                        <Select value={playerNum} onChange={changePlayersNum}>
                            {playerNumSelect}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} disabled={!playerNum || isStarted}>
                        <InputLabel>ウルフの人数</InputLabel>
                        <Select value={wolfNum} onChange={changeWolfNum}>
                            {wolfNumSelect}
                        </Select>
                    </FormControl>
                </div>
                {wolfNum ? (
                    <div id="input_name" className={classes.numberselect}>
                        <h3>プレイヤーの名前を入力して下さい（省略可）</h3>
                        <form className={classes.nameinput} noValidate autoComplete="off" aria-disabled={isStarted}>
                            {playersInput}
                        </form>
                        <br /><br />
                        <Link activeClass="active" to="game" smooth={true} duration={700}>
                            <Button variant="contained" color="primary" onClick={() => gameStart()} disabled={isStarted}>
                                Start!
                            </Button>
                        </Link>
                        <br /><br />
                    </div>

                ) : null}
            </div>
            {wolfNum ? (
                <div id="game">
                    {isStarted ?
                        <React.Fragment>
                            <div className={classes.eachtheme}>
                                {eachTheme}
                            </div>
                            <br /><br />
                            <Dialog open={finishOpen} onClose={() => finishDialogClose()}>
                                <DialogContent>
                                    <DialogContentText>
                                        ゲームを終了します。よろしいですか？
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => finishDialogClose()} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => { finishDialogClose(); gameEnd(); }} color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Button variant="contained" color="secondary" onClick={() => finishDialogOpen()} disabled={isFinished}>
                                終了
                            </Button>
                            <br /><br />
                            {isFinished ?
                                <div className="answer">
                                    <h3>市民 : {words[theme][whichWolf]} <br /><br /> ウルフ : {words[theme][whichWolf ^ 1]}</h3>
                                    <Link activeClass="active" to="select" smooth={true} duration={700}>
                                        <Button variant="contained" color="primary" endIcon={<ReplayIcon />} onClick={() => replay()}>Replay</Button>
                                    </Link>
                                    <br /><br />
                                </div>
                                : null}
                        </React.Fragment>
                        : null}
                </div>
            ) : null}
        </div>
    );
}

export default App;
