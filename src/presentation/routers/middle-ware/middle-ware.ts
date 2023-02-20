import { MongoClient } from "mongodb";
import { MongoDBContactDataSource } from "../../../data/data-sources/mongodb/mongodb-contact-data-source";
import { ProductDataSourceImpl } from "../../../data/data-sources/mysql/product-data-source";
import { DatabaseWrapper } from "../../../data/interfaces/data-sources/mongodb/database-wrapper";
import { ContactRepositoryImpl } from "../../../domain/repositories/contact-repository";
import { ProductRepositoryImpl } from "../../../domain/repositories/product-repository";
import { CreateContact } from "../../../domain/use-cases/contact/create-contact";
import { GetAllContacts } from "../../../domain/use-cases/contact/get-all-contacts";
import { GetAllProduct } from "../../../domain/use-cases/product/get-all-product";
import ProductRouter from "../product-router";
import ContactsRouter from "../contact-router";
import CategoriesRouter from "../categories-router";
import { GetAllCategories } from "../../../domain/use-cases/categories/get-all-categories";
import { CategoriesRepositoryImpl } from "../../../domain/repositories/categories-repository";
import { CategoriesDataSourceImpl } from "../../../data/data-sources/mysql/categories-data-source";
import { GetAllByCategoryId } from "../../../domain/use-cases/sub-category/get-all-by-category-id";
import SubCategoryRouter from "../sub-category-router";
import { SubCategoryRepositoryImpl } from "../../../domain/repositories/sub-category-repository";
import { SubCategoryDataSourceImpl } from "../../../data/data-sources/mysql/sub-category-data-source";
import { GetAllProductsByCategoryId } from "../../../domain/use-cases/product/get-all-by-category-id";
import { GetAllProductsBySubCategoryId } from "../../../domain/use-cases/product/get-all-by-sub-category-id";
import { Pagination } from "../../../core/pagination";
import { AddProduct } from "../../../domain/use-cases/product/add-product";
import ProductSizeTypeRouter from "../product-size-type-router";
import { GetAllProductSizeType } from "../../../domain/use-cases/product-size-type/get-all-product-size-type";
import { ProductTypeSizeRepositoryImpl } from "../../../domain/repositories/product-size-type-reposity";
import { ProductSizeTypeDataSourceImpl } from "../../../data/data-sources/mysql/product-size-type-data-source";
import ProductTypeRouter from "../product-type-routers";
import { GetAllBySubCategoryId } from "../../../domain/use-cases/product-type/get-all-by-sub-category-id";
import { ProductTypeRepositoryImpl } from "../../../domain/repositories/product-type-repository";
import { ProductTypeDataSourceImpl } from "../../../data/data-sources/mysql/product-type-data-source";
import { UploadProductImage } from "../../../domain/use-cases/product/upload-product-image";
import { AddProductSize } from "../../../domain/use-cases/product-size/add-product-size-usecase";
import { ProductSizeRepositoryImpl } from "../../../domain/repositories/product-size-repository";
import { ProductSizeDataSourceImpl } from "../../../data/data-sources/mysql/product-size-data-source";
import { AddProductImage } from "../../../domain/use-cases/product/add-product-image";
import { FindProductByQueryImpl } from "../../../core/util/mysql/find-product-by-query";
import { CloudinaryDataSourceImpl } from "../../../data/data-sources/cloudinary/cloudinary-data-source";
import { Cloudinary } from "../../../core/upload/cloudinary";
import { UploadCategoryImage } from "../../../domain/use-cases/categories/upload-category-image";
import { UpdateProductPrice } from "../../../domain/use-cases/product-size/update-product-price";
import { UpdateProductStatus } from "../../../domain/use-cases/product/update-product-status";
import { GetProductByProductId } from "../../../domain/use-cases/product/get-by-product-id";
import { AddSubCategoryImage } from "../../../domain/use-cases/sub-category/add-sub-category-image";
import { UploadSubCategoryImage } from "../../../domain/use-cases/sub-category/upload-image";
import UserRouter from "../users-router";
import { FindUserByQueryImpl } from "../../../core/util/mysql/find-user-by-query";
import { UserDataSourceImpl } from "../../../data/data-sources/mysql/user-data-source";
import { UserRepositoryImpl } from "../../../domain/repositories/user-repository";
import { GetAllUsers } from "../../../domain/use-cases/users/get-all-users";
import { AddUser } from "../../../domain/use-cases/users/add-user";
import { AddCustomer } from "../../../domain/use-cases/users/add-customer";
import { AddCustomerIndividual } from "../../../domain/use-cases/users/add-customer-individual";
import { AddCustomerJuristicPerson } from "../../../domain/use-cases/users/add-customer-juristic-person";
import { AddRestaurant } from "../../../domain/use-cases/restaurant/add-restaurant";
import { AddRestaurantDetail } from "../../../domain/use-cases/restaurant/add-restaurant-detail";
import { RestaurantRepositoryImpl } from "../../../domain/repositories/restaurant-repository";
import { RestaurantDataSourceImpl } from "../../../data/data-sources/mysql/restaurant-data-source";
import { FirebaseStorageDataSourceImpl } from "../../../data/data-sources/firebase/firebase-storage-data-source";
import { GoogleStorage } from "../../../core/upload/google-storage";
import { AuthenticationServiceImpl } from "../../../core/util/authentication/index";
import { GetUserByPhoneNumber } from "../../../domain/use-cases/users/get-user-by-phone-number";
import { AddStaff } from "../../../domain/use-cases/staff/add-staff";
import { StaffRepositoryImpl } from "../../../domain/repositories/staff-repository";
import { StaffDataSourceImpl } from "../../../data/data-sources/mysql/staff-data-source";
import { AddStaffDetail } from "../../../domain/use-cases/staff-detail/add-staff-detail";
import { StaffDetailRepositoryImpl } from "../../../domain/repositories/staff-detail-repositiry";
import { StaffDetailDataSourceImpl } from "../../../data/data-sources/mysql/staff-detail-data-source";
import SignInRouter from "../sign-in-router";
import { GetUserByPhoneNumberAndPasswordFromUserDB } from "../../../domain/use-cases/users/get-user-by-phone-number-and-password-from-user-db";
import {
	JsonWebTokenService,
	JsonWebTokenServiceImpl,
} from "../../../core/util/jwt/jwt-token";

export const contactMiddleWare = async () => {
	const client: MongoClient = new MongoClient(
		"mongodb://localhost:27017/contacts"
	);
	await client.connect();
	const db = client.db("CONTACTS_DB");

	const contactDatabase: DatabaseWrapper = {
		find: (query) => db.collection("contacts").find(query).toArray(),
		insertOne: (doc) => db.collection("contacts").insertOne(doc),
	};

	return ContactsRouter(
		new GetAllContacts(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDatabase)
			)
		),
		new CreateContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDatabase)
			)
		)
	);
};

export const ProductMiddleWare = ProductRouter(
	new GetAllProduct(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new GetAllProductsByCategoryId(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new GetAllProductsBySubCategoryId(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new AddProduct(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new AddProductSize(
		new ProductSizeRepositoryImpl(
			new ProductSizeDataSourceImpl(new Pagination())
		)
	),
	new UploadProductImage(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new AddProductImage(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new UpdateProductPrice(
		new ProductSizeRepositoryImpl(
			new ProductSizeDataSourceImpl(new Pagination())
		)
	),
	new UpdateProductStatus(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new GetProductByProductId(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	)
);

export const CategoriesMiddleWare = CategoriesRouter(
	new GetAllCategories(
		new CategoriesRepositoryImpl(
			new CategoriesDataSourceImpl(),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new UploadCategoryImage(
		new CategoriesRepositoryImpl(
			new CategoriesDataSourceImpl(),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	)
);

export const SubCategoryMiddleWare = SubCategoryRouter(
	new GetAllByCategoryId(
		new SubCategoryRepositoryImpl(
			new SubCategoryDataSourceImpl(),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new UploadSubCategoryImage(
		new SubCategoryRepositoryImpl(
			new SubCategoryDataSourceImpl(),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	),
	new AddSubCategoryImage(
		new SubCategoryRepositoryImpl(
			new SubCategoryDataSourceImpl(),
			new CloudinaryDataSourceImpl(new Cloudinary())
		)
	)
);

export const ProductSizeTypeMiddleWare = ProductSizeTypeRouter(
	new GetAllProductSizeType(
		new ProductTypeSizeRepositoryImpl(new ProductSizeTypeDataSourceImpl())
	)
);

export const ProductTypeMiddleWare = ProductTypeRouter(
	new GetAllBySubCategoryId(
		new ProductTypeRepositoryImpl(new ProductTypeDataSourceImpl())
	)
);

export const UserMiddleWare = UserRouter(
	new GetAllUsers(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddUser(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddCustomer(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddCustomerIndividual(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddCustomerJuristicPerson(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddRestaurant(
		new RestaurantRepositoryImpl(new RestaurantDataSourceImpl())
	),
	new AddRestaurantDetail(
		new RestaurantRepositoryImpl(new RestaurantDataSourceImpl())
	),
	new GetUserByPhoneNumber(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new AddStaff(new StaffRepositoryImpl(new StaffDataSourceImpl())),
	new AddStaffDetail(
		new StaffDetailRepositoryImpl(new StaffDetailDataSourceImpl())
	)
);

export const SignInRouterMiddleWare = SignInRouter(
	new GetUserByPhoneNumberAndPasswordFromUserDB(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	),
	new JsonWebTokenServiceImpl(
		new UserRepositoryImpl(
			new UserDataSourceImpl(
				new Pagination(),
				new FindUserByQueryImpl(),
				new AuthenticationServiceImpl()
			),
			new FirebaseStorageDataSourceImpl(
				new GoogleStorage(),
				new AuthenticationServiceImpl()
			)
		)
	)
);
