import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Badge from '@mui/material/Badge';
import Search from '../../Product/Search'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';







const Header = () => {
    const history = useHistory()

    const{cartItems} = useSelector((state)=> state.cart)
    
   const shoppingCart=()=>{
        history.push('/Cart')
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                               
                            >
                                Sabaikopasal.com
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                           <Search/>
                        
                        </Grid>
                        <Grid item xs={4}>
                            <Box style={{marginLeft:"150px"}} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton component={Link} to='/' size="large"  className="homeIcon" color="inherit">
                                   <Typography>
                                       Home
                                    </Typography> 
                                </IconButton>
                                <IconButton component={Link} to='/products' style={{marginLeft:"15px"}}size="large"  color="inherit">
                                   <Typography >
                                       product
                                    </Typography> 
                                </IconButton>
                                <IconButton  onClick= {shoppingCart} style={{marginLeft:"15px"}} size="large"  color="inherit">
                                <Badge badgeContent={cartItems ? cartItems.length : 0} color="error">
                                <AddShoppingCartIcon/>
                                </Badge>
                                </IconButton>
                                <IconButton  component={Link} to='/loginsignup' style={{marginLeft:"15px"}} size="large"  color="inherit">
                                <AccountBoxIcon/>
                                </IconButton>
                            </Box>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Header

