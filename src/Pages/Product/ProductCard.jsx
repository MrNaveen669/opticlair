// import { Link } from "react-router-dom";
// import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
// import { AiFillStar } from "react-icons/ai";

// const ProductCard = ({ products = [] }) => {
//   return (
//     <Grid
//       m="20px 10px"
//       templateColumns={{
//         base: "repeat(1, 1fr)",
//         sm: "repeat(1, 1fr)",
//         md: "repeat(2, 1fr)",
//         lg: "repeat(3, 1fr)"
//       }}
//       gap={6}
//     >
//       {products.length > 0 ? (
//         products.map((product) => (
//           <GridItem key={product._id}>
//             <Link to={`/products/${product._id}`}>
//               <Box
//                 position="relative"
//                 border="1px solid"
//                 borderColor="gray.200"
//                 borderRadius="10px"
//                 p="10px"
//                 _hover={{
//                   boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
//                   transform: "scale(1.05)",
//                   transition: "0.3s"
//                 }}
//                 mb="7"
//               >
//                 {/* Product Image */}
//                 <Image
//                   m="auto"
//                   width="80%"
//                   src={product.imageTsrc}
//                   alt={product.name}
//                   _hover={{ transform: "scale(1.1)" }}
//                 />

//                 {/* Product Details */}
//                 <Box p="10px">
//                   <Flex justifyContent="space-between" alignItems="center">
//                     <Flex
//                       w="30%"
//                       borderRadius="20px"
//                       alignItems="center"
//                       gap="5px"
//                       p="5px 10px"
//                       bgColor="#eeeef5"
//                       fontSize="15px"
//                     >
//                       <Text>
//                         {product.rating
//                           ? product.rating.toFixed(1)
//                           : (Math.random() * (5 - 1) + 1).toFixed(1)}
//                       </Text>
//                       <AiFillStar size="15px" color="#0fbd95" />
//                       <Text>
//                         {product.userRated
//                           ? product.userRated
//                           : Math.floor(Math.random() * 999 + 1)}
//                       </Text>
//                     </Flex>
//                   </Flex>

//                   <Text
//                     mt="5px"
//                     fontWeight="700"
//                     color="#000042"
//                     fontSize="16px"
//                     textTransform="capitalize"
//                   >
//                     {product.productRefLink}
//                   </Text>
//                   <Text mt="5px" fontWeight="400" color="gray.500" fontSize="14px">
//                     {product.name}
//                   </Text>
//                   <Text mt="5px" fontWeight="400" color="#000042" fontSize="14px">
//                     Shape: {product.shape}
//                   </Text>

//                   <Text mt="5px" fontWeight="bold" color="gray.700" fontSize="15px">
//                     ₹{product.price}{" "}
//                     <span
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "lighter",
//                         color: "#727297",
//                         textDecoration: "line-through"
//                       }}
//                     >
//                       ₹{product.mPrice}
//                     </span>
//                     <span style={{ color: "#727297", fontSize: "14px", fontWeight: "lighter" }}>
//                       {" "} (+tax)
//                     </span>
//                   </Text>
//                 </Box>

//                 {/* Promotional Banner */}
//                 <Box
//                   fontSize="15px"
//                   color="#cbb881"
//                   w="100%"
//                   padding="2"
//                   fontWeight="bold"
//                   bgGradient="linear(to-r, #f8f2e0, yellow.50)"
//                   textAlign="center"
//                 >
//                   BUY 1 GET 1 + 10% OFF
//                 </Box>
//               </Box>
//             </Link>
//           </GridItem>
//         ))
//       ) : (
//         <Text fontSize="lg" textAlign="center" colSpan={3}>
//           No products available.
//         </Text>
//       )}
//     </Grid>
//   );
// };

// export default ProductCard;

 
import { Link } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ products }) => {
  // Ensure products is an array
  const productList = Array.isArray(products) ? products : [];

  return (
    <Grid
      m="20px 10px"
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(1,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat(3,1fr)"
      }}
      gap={6}
    >
      {productList.map((product) => (
        <GridItem key={product._id}>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p="15px"
            _hover={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Link to={`/products/${product._id}`}>
              <Image
                m="auto"
                width="100%"
                height="200px"
                objectFit="cover"
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                borderRadius="8px"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Link>

            <Box p="10px">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="18px" fontWeight="bold" color="#000042">
                  {product.name}
                </Text>
                <Flex
                  bgColor="#eeeef5"
                  p="5px 10px"
                  borderRadius="20px"
                  alignItems="center"
                  gap="5px"
                >
                  <Text>{(Math.random() * (5 - 1) + 1).toFixed(1)}</Text>
                  <AiFillStar size="15px" color="#0fbd95" />
                </Flex>
              </Flex>

              <Text mt="5px" color="gray.500" fontSize="14px">
                {product.description}
              </Text>

              <Text mt="5px" fontWeight="500" color="#000">
                Category: <strong>{product.category}</strong>
              </Text>

              <Text mt="5px" fontWeight="bold" fontSize="18px" color="#333">
                ${product.price}
              </Text>
            </Box>

            <Box
              fontSize="14px"
              color="#cbb881"
              w="100%"
              padding="2"
              fontWeight="bold"
              bgGradient="linear(to-r, #f8f2e0, yellow.50)"
              textAlign="center"
            >
              Limited Offer: 10% OFF
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProductCard;
