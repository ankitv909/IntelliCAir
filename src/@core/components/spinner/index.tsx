// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

// ** Configs
import themeConfig from '@/configs/themeConfig'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
        <Box sx={{ mb:4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image alt={themeConfig.templateName} priority={true} src={'/images/favicon-cropped.png'} width={100} height={80} />
        </Box>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
