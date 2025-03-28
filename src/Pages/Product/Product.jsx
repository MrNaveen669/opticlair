// import React, { useEffect, useState } from "react";
// import Loading from "./Loading";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import Pagination from "../../Components/Pagination";
// import ProductCard from "./ProductCard";
// import ProdFilter from "./ProdFilter";
// import ProdFrame from "./ProdFrame";
// import { TbArrowsUpDown } from "react-icons/tb";
// import { Box, Flex, Select, Switch, Text, Image } from "@chakra-ui/react";
// import {
//   Gender,
//   ProductTypes,
//   FrameColor,
//   Frame1,
//   Frame2
// } from "./FilterDetails";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [types, setTypes] = useState("");
//   const [page, setPage] = useState(0);
//   const [sort, setSort] = useState("");
//   const [gender, setGender] = useState("");
//   const [productRef, setProductRef] = useState("");

//   // const fetchproduct = async () => {
//   //   setIsLoaded(true);
//   //   console.log("fetching products.....");
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5000/product?sort=${sort}&productRefLink=${productRef}&productType=${types}&gender=${gender}&page=${page}`
//   //     );
//   //     console.log(response + "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
//   //     const postData = await response.json();
//   //     console.log("Fetched products successfully:", postData);
//   //     setProducts(postData);
//   //     // console.log(postData +"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
//   //     setIsLoaded(false);
//   //   } catch (error) {
//   //     console.log( "Error fetching products", error);
//   //     setIsLoaded(false);
//   //   }
//   // };
//   const fetchproduct = async () => {
//     setIsLoaded(true);
//     // console.log("fetching products.....");
//     try {
//       const response = await fetch(
//         `http://localhost:5000/product?sort=${sort}&productRefLink=${productRef}&productType=${types}&gender=${gender}&page=${page}`
//       );
//       const postData = await response.json();
//       console.log("Fetched products successfully:", postData);
      
//       // Extract the nested products from the response
//       let normalizedProducts = [];
//       if (Array.isArray(postData) && postData.length > 0) {
//         // Check if it's our unusual nested structure
//         if (typeof postData[0] === 'object' && postData[0] !== null && '0' in postData[0]) {
//           // This is the nested format - extract the numbered keys
//           const container = postData[0];
//           normalizedProducts = Object.keys(container)
//             .filter(key => !isNaN(parseInt(key))) // Only get numeric keys
//             .map(key => {
//               // Add the parent _id to each product
//               return { 
//                 ...container[key], 
//                 _id: container._id || `product-${key}` 
//               };
//             });
//         } else {
//           // It's already the format we expect
//           normalizedProducts = postData;
//         }
//       }
      
//       setProducts(normalizedProducts);
//       setIsLoaded(false);
//     } catch (error) {
//       console.log("Error fetching products", error);
//       setIsLoaded(false);
//     }
//   };

//   useEffect(() => {
    
//     // fetchproduct();
//   // }, [page, sort, gender, types, productRef]);
//   // console.log("Updated products state:", products);
//   fetchproduct();
// }, [page, sort, gender, types, productRef]);

//   const handleClick = (value) => {
//     setProductRef(value);
//   };

//   const handleClick2 = (value) => {
//     setProductRef(value);
//   };

//   return (
//     <>
//       <Navbar />
//       <Box>
//         <Image
//           src="https://static1.lenskart.com/media/desktop/img/Mar23/spring/home/PLP%20Camapaign%20-%20WEB_1.jpg"
//           alt="img"
//           w="96%"
//           m="auto"
//         />
//         <Flex m="0" px="2%" gap="4" cursor="pointer">
//           <Flex
//             w="17%"
//             m={0}
//             display={{ base: "none", xl: "inherit" }}
//             flexDirection="column"
//           >
//             <ProdFrame
//               heading={"FRAME TYPE"}
//               type={Frame1}
//               filter={handleClick}
//             />

//             <ProdFrame
//               heading={"FRAME SHAPE"}
//               type={Frame2}
//               filter={handleClick2}
//             />

//             <ProdFilter
//               type={Gender}
//               heading={"GENDER"}
//               handlechange={setGender}
//               val={gender}
//               type1={ProductTypes}
//               heading1={"PRODUCT TYPE"}
//               handlechange1={setTypes}
//               val1={types}
//               type2={FrameColor}
//               heading2={"FRAME COLOR"}
//               handlechange2={setProductRef}
//               val2={productRef}
//             />

//             <hr />
//           </Flex>

//           <Box
//             overflow="scroll"
//             w={{ xl: "82%", base: "100%" }}
//             borderLeft="1px solid"
//             borderColor="gray.300"
//             m={0}
//           >
//             <Flex
//               justifyContent="space-between"
//               alignItems="center"
//               p="7px"
//               bg="#e2e8f0"
//               borderColor="#ededed"
//             >
//               <Text fontSize="15px" color="gray.600" fontWeight="500">
//                 EYEGLASSES & SUNGLASSES
//               </Text>
//               <Flex
//                 alignItems="center"
//                 display={{ md: "inherit", base: "none" }}
//               >
//                 <Text fontWeight="bold" mr="5px" color="green" fontSize="15px">
//                   VIEW FRAMES
//                 </Text>
//                 <Switch colorScheme="green" isChecked size="lg" />
//                 <Text ml="5px" fontSize="15px">
//                   VIEW 3D TRY ON
//                 </Text>
//               </Flex>
//               <Flex>
//                 <Flex alignItems="center">
//                   <TbArrowsUpDown color="green" fontWeight="bold" />
//                   <Text fontWeight="bold" color="green" fontSize="15px">
//                     SortBy
//                   </Text>
//                 </Flex>
//                 <Select
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                   border="0.1px"
//                   borderRadius="3px"
//                   borderColor="black"
//                   ml="4px"
//                   p="0px"
//                   fontSize="16px"
//                   bg="whiteAlpha.900"
//                 >
//                   <option value="">Select</option>
//                   <option value="lowtohigh">Price : low to high</option>
//                   <option value="hightolow">Price : high to low</option>
//                 </Select>
//               </Flex>
//             </Flex>
//             {products.length !== 0 && (
//               <Text mt="5px" textAlign="center" fontSize="15px">
//                 Showing {products.length} of 50 Results
//               </Text>
//             )}
//             {isLoaded ? (
//               <Loading />
//             ) : products.length !== 0 ? (
//               <ProductCard type={products} />
              
//             )  : (
//               <Text
//                 fontSize="28px"
//                 fontWeight="bolder"
//                 textAlign="center"
//                 color="gray"
//                 mt="5"
//               >
//                 No Glasses Found
//               </Text>
//             )}
//           </Box>
//         </Flex>
//         <Pagination current={page} onChange={(value) => setPage(value)} />
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/sampleproduct/all");
        if (!response.ok) throw new Error("Failed to fetch products.");
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box p="20px">
      <Text fontSize="24px" fontWeight="bold" textAlign="center">
        Sample Products
      </Text>

      {loading ? (
        <Box textAlign="center" mt="20px">
          <Spinner size="lg" color="blue.500" />
        </Box>
      ) : error ? (
        <Text color="red.500" textAlign="center">{error}</Text>
      ) : products.length > 0 ? (
        <ProductCard products={products} />
      ) : (
        <Text textAlign="center" fontSize="18px" color="gray.500">
          No products available
        </Text>
      )}
    </Box>
  );
};

export default Product;