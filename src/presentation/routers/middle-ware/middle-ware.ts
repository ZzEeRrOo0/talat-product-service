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
import { AddProduct } from "../../../domain/use-cases/product/add-product-usecase";
import ProductSizeTypeRouter from "../product-size-type-router";
import { GetAllProductSizeType } from "../../../domain/use-cases/product-size-type/get-all-product-size-type";
import { ProductTypeSizeRepositoryImpl } from "../../../domain/repositories/product-size-type-reposity";
import { ProductSizeTypeDataSourceImpl } from "../../../data/data-sources/mysql/product-size-type-data-source";
import ProductTypeRouter from "../product-type-routers";
import { GetAllBySubCategoryId } from "../../../domain/use-cases/product-type/get-all-by-sub-category-id";
import { ProductTypeRepositoryImpl } from "../../../domain/repositories/product-type-repository";
import { ProductTypeDataSourceImpl } from "../../../data/data-sources/mysql/product-type-data-source";
import { FirebaseStorageDataSourceImpl } from "../../../data/data-sources/firebase/firebase-storage-data-sorce";
import { GoogleStorage } from "../../../core/upload/google-storage";
import { UploadProductImage } from "../../../domain/use-cases/product/upload-product-image";
import { AddProductSize } from "../../../domain/use-cases/product-size/add-product-size-usecase";
import { ProductSizeRepositoryImpl } from "../../../domain/repositories/product-size-repository";
import { ProductSizeDataSourceImpl } from "../../../data/data-sources/mysql/product-size-data-source";
import { AddProductImage } from "../../../domain/use-cases/product/add-product-image";
import { FindProductByQueryImpl } from "../../../core/util/mysql/find-product-by-query";
import { UpdateProductPrice } from "../../../domain/use-cases/product-size/update-product-price";
import { UpdateProductStatus } from "../../../domain/use-cases/product/update-product-status-usecase";

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
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	),
	new GetAllProductsByCategoryId(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	),
	new GetAllProductsBySubCategoryId(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	),
	new AddProduct(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
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
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	),
	new AddProductImage(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	),
	new UpdateProductPrice(
		new ProductSizeRepositoryImpl(
			new ProductSizeDataSourceImpl(
				new Pagination(),
			),
		)
	),
	new UpdateProductStatus(
		new ProductRepositoryImpl(
			new ProductDataSourceImpl(
				new Pagination(),
				new FindProductByQueryImpl()
			),
			new FirebaseStorageDataSourceImpl(new GoogleStorage())
		)
	)
);

export const CategoriesMiddleWare = CategoriesRouter(
	new GetAllCategories(
		new CategoriesRepositoryImpl(new CategoriesDataSourceImpl())
	)
);

export const SubCategoryMiddleWare = SubCategoryRouter(
	new GetAllByCategoryId(
		new SubCategoryRepositoryImpl(new SubCategoryDataSourceImpl())
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
