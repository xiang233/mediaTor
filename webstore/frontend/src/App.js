import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomepageScreen from "./screens/shop/HomepageScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductScreen from "./screens/shop/ProductScreen";
import { ChakraProvider } from "@chakra-ui/react";
import CartScreen from "./screens/shop/CartScreen";
import LoginScreen from "./screens/user/AuthScreen";
import ShippingScreen from "./screens/shop/ShippingScreen";
import PaymentScreen from "./screens/shop/PaymentScreen";
import PlaceOrderScreen from "./screens/shop/PlaceOrderScreen";
import UserProfileScreen from "./screens/user/UserProfileScreen";
import PorunoScreen from "./screens/media/PorunoScreen";
import VideoScreen from "./screens/media/VideoScreen";
import AuthProvider from "./contexts/AuthContext";
import UserBlogScreen from "./screens/user/UserBlogScreen";
import UserScreen from "./screens/user/UserScreen";
import ShopScreen from "./screens/shop/ShopScreen";
import MediaScreen from "./screens/media/MediaScreen";
import LandingScreen from "./screens/general/LandingScreen";
import MediaHomeScreen from "./screens/media/MediaHomeScreen";
import FeedScreen from "./screens/media/FeedScreen";
import MediaDetailScreen from "./screens/media/MediaDetailScreen";
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          {/* <div className="App"> */}

          <Routes>
            <Route path="/landing" element={<LandingScreen />} />

            <Route path="/" element={<MediaScreen />}>
              <Route index element={<MediaHomeScreen />} />
              <Route path="media_search/:id" element={<MediaDetailScreen />} />
              <Route path="feed" element={<FeedScreen />} />
            </Route>

            <Route path="/shop" element={<ShopScreen />}>
              <Route index element={<HomepageScreen />} />
              <Route path="product/:id" element={<ProductScreen />} />
              <Route path="cart/" element={<CartScreen />} />
              <Route path="shipping/" element={<ShippingScreen />} />
              <Route path="payment/" element={<PaymentScreen />} />
              <Route path="place_order/" element={<PlaceOrderScreen />} />
            </Route>

            <Route path="/user/:user_id" element={<UserScreen />}>
              <Route path="profile" element={<UserProfileScreen />} />
              <Route path="blog" element={<UserBlogScreen />} />
            </Route>

            <Route path="/login/" element={<LoginScreen />} />
            <Route path="/logout/" element={<LoginScreen />} />

            <Route path="/private/porunoshare/" element={<PorunoScreen />} />
            <Route
              path="/private/porunoshare/video/:video_id"
              element={<VideoScreen />}
            />
          </Routes>
        </AuthProvider>
        {/* </div> */}
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
