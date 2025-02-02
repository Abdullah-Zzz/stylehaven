import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import {
    Box,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Collapse,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FullScreenLoading from "../loadingComp/fullScreenloader";


export default function ViewAll() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false)

    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [Info, setInfo] = useState();
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const chkUrl = () => {
            if (name.toLowerCase() !== "oversized" && name.toLowerCase() !== "premium") {
                navigate("/not-found");
            }
        };
        const fetchData = async () => {
            try{
                setLoading(true)
                const res = await axios.get(`${backend_url}/api/data/getitems`);
                setInfo(res.data[0]);
            }
            catch(err){
                throw err
            }
            finally{
                setLoading(false)
            }
           
        };
        fetchData();
        chkUrl();
    }, []);

    useEffect(() => {
        if (Info) {
            const pageInfo = Info.availableItems.filter((item) =>
                name.toLowerCase() === item.name.split(" ")[0].toLowerCase()
            );
            setFilteredItems(pageInfo[0]?.details || []);
        }
    }, [Info, name]);

    const handleSortChange = (e) => {
        const sortType = e.target.value;
        setSortOption(sortType);
        let sortedItems = [...filteredItems];
        if (sortType === "priceLowToHigh") {
            sortedItems.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortType === "priceHighToLow") {
            sortedItems.sort((a, b) => b.discountPrice - a.discountPrice);
        }
        setFilteredItems(sortedItems);
    };

    return (
        <Box>
            {loading && <FullScreenLoading />}
            <Box mt={4} px={2}>
                {/* Responsive Filters Section */}
                <Box
                    display={{ xs: "block", md: "none" }}
                    mb={2}
                    textAlign="center"
                >
                    <IconButton
                        onClick={() => setShowFilters(!showFilters)}
                        color="primary"
                    >
                        <FilterListIcon />
                        <Typography variant="button" ml={1}>
                            Show Filters
                        </Typography>
                    </IconButton>
                </Box>

                <Grid container spacing={3}>
                    {/* Filters (Left column on larger screens) */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        component={Box}
                        display={{ xs: showFilters ? "block" : "none", md: "block" }}
                    >
                        <Collapse in={showFilters || window.innerWidth >= 960}>
                            <Box bgcolor="grey.100" p={3} borderRadius={2}>
                                <Typography variant="h6" fontWeight="bold" mb={2}>
                                    Filter Options
                                </Typography>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel id="sort-label">Sort by</InputLabel>
                                    <Select
                                        labelId="sort-label"
                                        value={sortOption}
                                        onChange={handleSortChange}
                                        label="Sort by"
                                    >
                                        <MenuItem value="default">Default</MenuItem>
                                        <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                                        <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant="body1" fontWeight="bold" mt={3} mb={1}>
                                    Categories
                                </Typography>
                                <Box>
                                    <Button variant="text" fullWidth>
                                        All Items
                                    </Button>
                                    <Button variant="text" fullWidth>
                                        Discounts
                                    </Button>
                                    <Button variant="text" fullWidth>
                                        New Arrivals
                                    </Button>
                                </Box>
                            </Box>
                        </Collapse>
                    </Grid>

                    {/* Items Section */}
                    <Grid item xs={12} md={9}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            gutterBottom
                            textTransform="capitalize"
                        >
                            {name.toLowerCase() === "oversized"
                                ? "Oversized Shirts"
                                : "Premium Cotton Shirts"}
                        </Typography>
                        <Grid container spacing={3}>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={item.image}
                                                alt={item.type}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {item.type}
                                                </Typography>
                                                <Box display="flex" justifyContent="space-between" mt={1}>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        PKR: {item.discountPrice}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ textDecoration: "line-through" }}
                                                    >
                                                        PKR: {item.price}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="primary" mt={1}>
                                                    ({item.discountPerc}% OFF)
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    component={Link}
                                                    to={`/order/${name.toLowerCase()}/${item.id}`}
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                >
                                                    Order Now
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ width: "100%" }}
                                >
                                    No items available at the moment.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}
