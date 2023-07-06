const { z } = require("zod");
class BookServices {
  validateBannerData = (bookData) => {
    try {
      const validateSchema = z.object({
        title: z.string().nonempty({ message: "Title is required." }).max(100, {
          message: "Title mustn't be greater than 100 characters.",
        }),
        price: z
          .number()
          .nonnegative({ message: "The price can't be a negative value." })
          .lte(5000, {
            message: "The price must be less than or equal to 5000.",
          }),
        author: z
          .array(
            z
              .string()
              .nonempty({ message: "Author is required." })
              .max(30, { message: "Name mustn't be more than 40 characters." })
          )
          .refine((array) => array.length > 0, {
            message: "The should be at least one author",
          }),
        isbn: z.number().nullable(),
        stock: z.number().nonnegative({ message: "Value must be positive." }),
      });
      return validateSchema.parse(bookData);
    } catch (error) {
      console.log(error);
      // console.log("first");
      // console.log(JSON.stringify(error));
      const errors = error.errors;
      let errorBags = {};
      errors?.map((item) => {
        if (item.code == "invalid_type") {
          errorBags[item.path[0]] = `${item.path[0]} is ${item.message}`;
        } else if (
          item.code == "too_small" ||
          item.code == "custom" ||
          item.code == "too_big"
        ) {
          errorBags[item.path[0]] = item.message;
        } else {
        }
      });
      // console.log(errorBags);
      throw { type: "banner", status: 400, msg: errorBags };
    }
  };
}
const bookServiceObj = new BookServices();
module.exports = { BookServices, bookServiceObj };
