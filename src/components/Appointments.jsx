import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Table,
  
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Flex,
  Text,
  Icon,
  Center,
  
} from '@chakra-ui/react';
import { CalendarIcon, EmailIcon, TimeIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import '../App.css'; // assuming you're importing App.css already


export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const tableBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/appointments');
        setAppointments(res.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // if (loading) {
  //   return (
  //     <Flex justify="center" align="center" minH="70vh">
  //       <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
  //     </Flex>
  //   );
  // }
  if (loading) {
  return (
    <Flex justify="center" align="center" minH="70vh">
      <div className="loader"></div>
    </Flex>
  );
}


  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Center mb={6}>
        <Heading size="lg" color="teal.600">
          📅 Booked Appointments
        </Heading>
      </Center>

      {appointments.length === 0 ? (
        <Center>
          <Text color="gray.500" fontSize="lg">
            No appointments booked yet.
          </Text>
        </Center>
      ) : (
        <Box
          overflowX="auto"
          boxShadow="lg"
          borderRadius="lg"
          bg={tableBg}
          p={6}
          maxW="100%"
        >
          <Table variant="simple" size="md">
            <Thead bg="teal.100">
              <Tr>
                <Th><Icon as={FaUser} mr={2} />Name</Th>
                <Th><Icon as={EmailIcon} mr={2} />Email</Th>
                <Th><Icon as={CalendarIcon} mr={2} />Date</Th>
                <Th><Icon as={TimeIcon} mr={2} />Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appt) => (
                <Tr key={appt._id}>
                  <Td>{appt.name}</Td>
                  <Td>{appt.email}</Td>
                  <Td>{appt.date}</Td>
                  <Td>{appt.time}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
