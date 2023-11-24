//create home component function component
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'
import PostItem from '@/components/Home/PostItem'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Home() {
    return <>
        <Grid container spacing={1}>
          {[1,2,3].map(e=>(
            <Grid container item spacing={3} key={e}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Item><PostItem></PostItem></Item>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Item><PostItem></PostItem></Item>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Item><PostItem></PostItem></Item>
              </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Item><PostItem></PostItem></Item>
                </Grid>
            </Grid>))}
        </Grid>
    </>;
}