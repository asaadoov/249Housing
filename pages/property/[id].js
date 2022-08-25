import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { RiWhatsappFill } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import Link from 'next/link';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos, geography, location, phoneNumber: {whatsapp}  ,contactName } }) => (
  <Box maxWidth='1000px' margin='auto' p='4'>
  <style>
    {` 
      a {
        display: inline-block;
      }
    `}
  </style>
    {photos && <ImageScrollbar data={photos} />}
    <Box w='full' p='6'>
      <Flex paddingTop='2' alignItems='center'>
        <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
        <Text fontWeight='bold' fontSize='lg'>
          AED {price} {rentFrequency && `/${rentFrequency}`}
        </Text>
        <Spacer color="gray.200" />
        <Avatar size='sm' src={agency?.logo?.url}></Avatar>
      </Flex>
      <Flex alignItems='center' p='1' justifyContent='space-between' w='450px' color='blue.400'>
        {rooms}<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill /> 
      </Flex>
    </Box>
    <Flex alignItems="start" justifyContent='space-between'>
      <Box marginTop='2' maxHeight="700px">
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
        <Text lineHeight='2' color='gray.600'>{description.length > 1000 ? description.substring(0, 1000) + '...' : description}</Text>
      </Box>
      <Box margin='4'>
        <Box>
          <Text fontSize='lg' marginBottom='2' fontWeight='bold'>Contacts</Text>
          <Text fontSize='lg' margin='2' lineHeight='2' color='gray.600'>Get in Touch with <strong> {contactName} </strong> <a href={`https://api.whatsapp.com/send/?phone=${whatsapp}&text&type=phone_number`} target="_blank" rel="noreferrer"> <Box color='green.500'><RiWhatsappFill  /></Box></a></Text>
        </Box>
        <Box>
          <Text fontSize='lg' marginBottom='4' fontWeight='bold'>Location</Text>
          <Box marginBottom='5' width="450px" maxHeight="700px">
            { geography && 
              <iframe
              width="100%"
              height="450px"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDXVxAIeB4b71N6ISGR3iFcW18g6mN0Ups
              &q=${location[3].name ? location[3].name : location[1].name}&center=${geography.lat},${geography.lng}&zoom=16`}>
              </iframe>
            }
          </Box>
        </Box>
      </Box>
    
    </Flex>
    <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Type</Text>
        <Text fontWeight='bold'>{type}</Text>
      </Flex>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Purpose</Text>
        <Text fontWeight='bold'>{purpose}</Text>
      </Flex>
      {furnishingStatus && (
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
          <Text>Furnishing Status</Text>
          <Text fontWeight='bold'>{furnishingStatus}</Text>
        </Flex>
      )}
    </Flex>
    <Box>
      {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
        <Flex flexWrap='wrap'>
          {amenities?.map((item) => (
              item?.amenities?.map((amenity) => (
                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                  {amenity.text}
                </Text>
              ))
          ))}
        </Flex>
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  
  return {
    props: {
      propertyDetails: data,
    },
  };
}