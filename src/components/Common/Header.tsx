import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

import AdbIcon from '@mui/icons-material/Adb'
import { useEffect, useState } from 'react'
import { clearAllLocalStorage, getLocalStorage } from '@/utils/local-storage'
import { UserLogin } from '@/model/user.model'
import Link from 'next/link'
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  PaletteMode,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import DarkModeButton from '@/components/Button/DarkModeButton'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'] as const
interface HeaderProps {
  mode: PaletteMode;
  handleThemeChange: () => void;
}
export function Header({ mode, handleThemeChange }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [user, setUser] = useState<UserLogin>()
  const theme = useTheme()
  type SettingsType = typeof settings[number];
  useEffect(() => {
    const currentUser = getLocalStorage('user') as UserLogin
    setUser(currentUser)
  }, [])
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (option: SettingsType) => {
    if (option === 'Logout') {
      logout()
    } else if (option === 'Profile') {

    } else if (option === 'Account') {

    }
    setAnchorElUser(null)
  }

  function logout() {
    clearAllLocalStorage()
    setUser(undefined)
  }

  return (
      <AppBar position='static' sx={{ backgroundColor: theme.palette.background.default }} >
        <Container maxWidth='xl'>
          <Toolbar disableGutters >
            <AdbIcon color='primary' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              color="primary"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} color="primary">
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='primary'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'

                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center' color='primary'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              color="primary"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  color='primary'
                  sx={{ my: 2,
                    display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <DarkModeButton mode={mode} onThemeChange={handleThemeChange} />
            {user && <Box sx={{ flexGrow: 0 }}>

              <Tooltip color='primary' title={`Hello ${user.email}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>}
            {!user && <Button
              color='primary'
              sx={{ my: 2,
                display: 'block' }}
              LinkComponent={Link}
              href="/auth/login"
            >
              Login
            </Button>}
          </Toolbar>
        </Container>
      </AppBar>
  )
}