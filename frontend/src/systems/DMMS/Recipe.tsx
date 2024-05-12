import { Add } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import AddRecipeModal from "../DMMS/mediMatiComponent/AddRecipeModal";
import { useState } from "react";

function Recipe() {

    const [addRecipeModalOpen, setAddRecipeModalOpen] = useState<boolean>(false);
    const handleAddModalOpen = () => setAddRecipeModalOpen(true);
    const handleAddModalClose = () => setAddRecipeModalOpen(false);

    function addNewRecipe(_p: any) {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <Box>
                <Typography variant='h3' color='primary' align="center">
                    Medicine Recipes
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }} my={2} mx={2} >
                <Box flexGrow={1}></Box>
                <Button variant="outlined" startIcon={<Add />} onClick={handleAddModalOpen} >
                    Add Recipe
                </Button>
            </Box>
            <AddRecipeModal onClose={handleAddModalClose} addRecipeModalOpen={addRecipeModalOpen} addNewRecipe={addNewRecipe} medicineNames={undefined} setReqMedicine={function (p1: any): void {
                throw new Error("Function not implemented.");
            }} />
        </div>
    )
}

export default Recipe;

// function useState<T>(_arg0: boolean): [any, any] {
//     throw new Error("Function not implemented.");
// }
