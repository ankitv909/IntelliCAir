// ** MUI Components
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Icon from '../../../@core/components/icon';
import Box from '@mui/material/Box';

const SocialLogins = () => {

    // ** Hook
    const theme = useTheme()

    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/redirect`}
            component={Link}
            sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
        >
            <Icon icon="mdi:github"/>
        </IconButton>
        <IconButton href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect`} component={Link}
                    sx={{ color: '#db4437' }}>
            <Icon icon="mdi:google"/>
        </IconButton>
    </Box>
}

export default SocialLogins
