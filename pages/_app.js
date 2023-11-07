import '../styles/global.css';
import { StyledEngineProvider } from '@mui/styled-engine';

export default function App({ Component, pageProps }) {

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <StyledEngineProvider injectFirst>

            {getLayout(
                <Component {...pageProps} />
            )}

        </StyledEngineProvider>
    )

}