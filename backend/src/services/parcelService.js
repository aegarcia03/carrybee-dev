const prisma = require('../prismaClient');


// Create Parcel
const createParcel = async (parcelData) => {
  try {
    const { item_name, category, quantity, weight, width, length, height, description, user_id } = parcelData;

    const categoryDimensions = {
      SMALL: { length: 50, width: 40, height: 50, maxWeight: 20 },
      MEDIUM: { length: 210, width: 120, height: 110, maxWeight: 600 },
      LARGE: { length: 210, width: 120, height: 120, maxWeight: 1000 }
    };
    // If category is not 'OTHER', assign default dimensions and max weight based on category
    if (category !== 'OTHER') {
      const defaultDim  = categoryDimensions[category]
      if (!defaultDim) {
        throw new Error('Invalid category selected')
      }
    // Check if the provided weight exceeds the maximum weight for this category
    if (weight > defaultDim.maxWeight) {
      throw new Error(`Weight exceeds the maximum limit for the ${category} category. Max weight: ${defaultDim.maxWeight} kg`);
    }
    // Assign default dimensions if the category is SMALL, MEDIUM, or LARGE
    parcelData.width = defaultDim.width;
    parcelData.length = defaultDim.length;
    parcelData.height = defaultDim.height;

    // If category is 'OTHER', ensure dimensions are provided
   } else {
      if (!width || !length || !height || !weight) {
        throw new Error('For category "OTHER", width, length, height and weigth are required.');
      }
    }
    // Create the parcel
    const newParcel = await prisma.parcel.create({
      data: {
        item_name,
        category,
        quantity,
        weight,
        width: parcelData.width,
        length: parcelData.length,
        height: parcelData.height,
        description,
        user_id,
      },
    });
    return { message: 'Parcel created successfully', parcel: newParcel };
  } catch (error) {
    throw new Error('Failed to create parcel: ' + error.message);
  }
};


//Get All Parcels
const getAllParcels = async () => {
  try {
    return await prisma.parcel.findMany();
  } catch (error) {
    throw new Error('Failed to get all parcels');
  }
};

//Get Parcel By ID
const getParcelById = async (id) => {
  try {
    const parcel = await prisma.parcel.findUnique({ where: { id } });
    if (!parcel) {
        throw new Error('Parcel not found');
    }
    return parcel;
  } catch (error) {
    throw new Error (error.message);
  }
};

// Update parcel
const updateParcel = async (id, updateData) => {
  try {
    const { item_name, category, quantity, weight, width, length, height, description } = updateData;
    const updatedParcel = await prisma.parcel.update({
        where: { id },
        data: {
            item_name: item_name || undefined,
            category: category || undefined,
            quantity: quantity || undefined,
            weight: weight || undefined,
            width: width || undefined,
            lenght: length|| undefined,
            height: height || undefined,
            description: description || undefined,
        },
    });
    return { message: 'Parcel updated succesfully', parcel: updatedParcel};
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete parcel
const deleteParcel= async (id) => {
  try {
    await prisma.parcel.delete({ where: { id }});
    return { message: 'Parcel deleted succesfully'};
  } catch (error) {
    throw new Error ('Failed to delete parcel');
  }
};

module.exports = {
    createParcel,
    getAllParcels,
    getParcelById,
    updateParcel,
    deleteParcel,
};