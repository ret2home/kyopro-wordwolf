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

const words = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
];

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
    const [finishOpen,setFinishOpen]=useState<boolean>(false);
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
    const finishDialogOpen=()=>{
        setFinishOpen(true);
    }
    const finishDialogClose=()=>{
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
                                    <Button onClick={() => {finishDialogClose();gameEnd();}} color="primary">
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
                                    <h3>市民 : {words[theme][whichWolf]} , ウルフ : {words[theme][whichWolf ^ 1]}</h3>
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
