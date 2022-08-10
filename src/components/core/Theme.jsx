import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#122C51'
        },
        secondary: {
            main: '#fff'
        },
        background: {
            default: '#000',
            paper: '#fff',
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    color: 'inherit'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    height: '3rem'
                },
                containedPrimary: {
                    borderRadius: '20px',
                    backgroundColor: '#122C51',
                    color: '#fff',
                    fontWeight: 'bold'
                },
                containedSecondary: {
                    color: '#122C51',
                    border: '1px solid #122C51',
                    backgroundColor: '#fff',
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: '20px'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                },
                paper: {
                    borderRadius: '10px',
                    padding: '15px'
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                },
                paper: {
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                }
            }
        }
    }
});

export default Theme;