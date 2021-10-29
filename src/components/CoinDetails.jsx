import DOMPurify from "dompurify"
import styled from "styled-components"
import Breakpoint from "../constants/Breakpoint"

import Color from "../constants/Color"
import ResourceState from "../constants/ResourceState"
import { useCoins } from "../hooks/useCoins"
import { currencyFormatter, dateFormatter } from "../utils"

const CoinDetailsWrapper = styled.div`
  grid-area: details;
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  grid-template-areas:
    ". . . link"
    "description description description description";
  gap: 1rem;
  padding-top: 1rem;

  @media (max-width: ${Breakpoint.SM}) {
    grid-template-columns: auto;
    grid-template-areas:
      "."
      "."
      "."
      "description"
      "link";
  }
`

const Description = styled.div`
  grid-area: description;
  text-align: justify;
`

const HomeLink = styled.a`
  grid-area: link;
  justify-self: end;
  align-self: center;

  @media (max-width: ${Breakpoint.SM}) {
    justify-self: center;
  }
`

const LoadingMessage = styled.div`
  grid-area: details;
  justify-self: center;
  line-height: 2;
  color: ${Color.HeliotropeGray};
`

const ErrorMessage = styled.div`
  grid-area: details;
  justify-self: center;
  line-height: 2;
  color: ${Color.DarkSalmon};
`

const DataSegmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: ${Breakpoint.SM}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const DataSegmentLabel = styled.div`
  color: ${Color.HeliotropeGray};
  font-size: 0.75rem;

  @media (max-width: ${Breakpoint.SM}) {
    font-size: 1rem;
  }
`

const DataSegmentValue = styled.div`
  font-size: 1.25rem;

  @media (max-width: ${Breakpoint.SM}) {
    font-size: 1rem;
  }
`

const DataSegment = ({ label, value }) => (
  <DataSegmentWrapper>
    <DataSegmentLabel>{label}</DataSegmentLabel>
    <DataSegmentValue>{value}</DataSegmentValue>
  </DataSegmentWrapper>
)

const CoinDetails = ({ id }) => {
  const { coins: { details: { [id]: { data, state } } } } = useCoins()

  if (state === ResourceState.PENDING) {
    return <LoadingMessage>Loading...</LoadingMessage>
  }

  if (state === ResourceState.ERROR) {
    return <ErrorMessage>There was an error loading the details.</ErrorMessage>
  }

  return (
    <CoinDetailsWrapper>
      <DataSegment
        label="Market Cap"
        value={currencyFormatter.format(data.market_data.market_cap.eur)} />
      <DataSegment label="Hashing Algorithm" value={data.hashing_algorithm || '-'} />
      <DataSegment label="Genesis Date" value={dateFormatter.format(new Date(data.genesis_date))} />
      <HomeLink href={data.links.homepage[0]} target="_blank">Homepage</HomeLink>
      <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description.en)}} />
    </CoinDetailsWrapper>
  )
}

export default CoinDetails
