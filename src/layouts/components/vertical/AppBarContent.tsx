// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Type Import
import { Settings } from '@/@core/context/settingsContext'

// ** Components
import ModeToggler from '@/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '@/@core/layouts/components/shared-components/UserDropdown'
import Typography from "@mui/material/Typography";
import SearchComponent from "@/components/search-job/explore-job";
import MenuItems from "@/components/menu-item/menu-items";

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2,width:'100%', display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
          {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}
          <SearchComponent />
          <MenuItems/>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
