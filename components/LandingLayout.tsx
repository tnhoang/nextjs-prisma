import { Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import Headers from './Headers'

type Props = {
    children: React.ReactNode
}

function LandingLayout(props: Props) {
    return (
        <Flex
            direction="column"
            align="center"
            maxW={{ xl: "1200px" }}
            m="0 auto"
            padding="10px"
        >
            <Headers />
            {props.children}
            <Footer />
        </Flex>
    )
}

export default LandingLayout