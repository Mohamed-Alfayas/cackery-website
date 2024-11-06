import Search from "../../assets/icons/search.png";
import Popularity from "../../assets/icons/popularity.png";
import { FormControl, Grid, InputAdornment, MenuItem, Select, Skeleton, TextField } from "@mui/material";
import CakeOfferCard from "../../component/common/Category/CakeOfferCard";
import CategoryButton from "./CategoryButton";
import './MenuList.scss';
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { getOverallCakeMenuList } from "../../utils/cakeryAPI";

const MenuList = () => {
  const { setIsPreloaderShow, subCategoriesObj, menuListObj, setMenuListObj, initPageMenuList, setInitPageMenuList } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (initPageMenuList) {
      getCakeList();
      setInitPageMenuList(false);
    }
  }, [])

  const getCakeList = async () => {
    try {
      // setIsPreloaderShow(true);
      const getCakeAPIResponse = await getOverallCakeMenuList();
      console.log("Fetched Cake Data:", getCakeAPIResponse?.data);
      setMenuListObj(getCakeAPIResponse?.data)
    } catch (error) {
      console.error(error)
    } finally {
      // setIsPreloaderShow(false);
    }
  };

  const handleSelect = (name) => {
    setSelectedCategory(name);
  };

  const filteredMenuList = selectedCategory === 'All'
    ? menuListObj
    : menuListObj.filter(cake => cake.sub_category?.name === selectedCategory);

  return (
    <div className="bg-gradient">
      <Grid container spacing={2}>
        <Grid item md={3} sm={3} xs={12}>
          <div>
            <div className="rounded overflow-hidden shadow-lg p-3">
              <h2 className="font-poppins font-semibold text-sm">Filters</h2>
              <div className="py-4 relative">
                <TextField
                  placeholder="Search Cakes"
                  variant="outlined"
                  size="small"
                  className="text-xs rounded-md border-[1.4px] border-solid border-solid border-Layout-300 bg-Layout-100"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={Search}
                          height={16}
                          width={16}
                        />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </div>
              <FormControl variant="outlined" fullWidth size="small">
                <Select
                  placeholder="Popularity"
                  endAdornment={
                    <InputAdornment position="end">
                      <img
                        src={Popularity}
                        height={16}
                        width={16}
                      />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={'ASC'}>Low to High</MenuItem>
                  <MenuItem value={'DESC'}>High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="rounded overflow-hidden shadow-lg p-3 mt-8">
              <h2 className="font-poppins font-semibold text-sm">Categories</h2>
              <div className="py-2">
                <CategoryButton
                  name="All"
                  key="all"
                  selectedCategory={selectedCategory}
                  handleSelect={handleSelect}
                />
                {subCategoriesObj.map((category, index) => (
                  <CategoryButton
                    name={category.name}
                    key={index}
                    selectedCategory={selectedCategory}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </Grid>

        <Grid item md={9} sm={9} xs={12}>
          <Grid container spacing={2}>
            
            {menuListObj.length ? filteredMenuList?.map((data, index) => (
              <CakeOfferCard
                key={index}
                column={3}
                image={data?.images?.[0]?.url}
                discount={data?.price_list?.[0]?.offer_percentage?.[0]}
                title={data?.name}
                originalPrice={data?.price_list?.[0]?.price}
                discountPrice={data?.price_list?.[0]?.cake_price_after_offer}
                id={data?.id}
              />
            )) : (
              Array.from({ length: 8 }).map((_, index) => (
                <Grid item key={index} md={3} sm={6} xs={6}>
                  <Skeleton variant="rounded" animation="wave" height={"325px"} width={"100%"} />
                </Grid>
              ))
           )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuList;
