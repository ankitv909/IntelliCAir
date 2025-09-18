// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import CustomFooter from "@/components/footer";

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh',backgroundColor:'#fff', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
      <div className={'w-full bg-black'}>
        <CustomFooter/>
      </div>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
