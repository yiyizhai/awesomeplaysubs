package com.example.awesomeplaysubs;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.ProductDetailsResponseListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.google.common.collect.ImmutableList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private BillingClient billingClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize the BillingClient
        billingClient = BillingClient.newBuilder(this)
                .setListener((billingResult, purchases) -> {
                    // To be implemented in a later version
                })
                .enablePendingPurchases()
                .build();

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    // The BillingClient is ready. You can query for products here.
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Try to restart the connection on the next request to
                // Google Play by calling the startConnection() method.
            }
        });

        Button subscribeButton = findViewById(R.id.subscribe_button);
        subscribeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // NOTE: Replace "test_subscription_id" with your actual subscription ID from the Google Play Console.
                launchPurchaseFlow("test_subscription_id");
            }
        });
    }

    private void launchPurchaseFlow(String productId) {
        QueryProductDetailsParams queryProductDetailsParams =
                QueryProductDetailsParams.newBuilder()
                        .setProductList(
                                ImmutableList.of(
                                        QueryProductDetailsParams.Product.newBuilder()
                                                .setProductId(productId)
                                                .setProductType(BillingClient.ProductType.SUBS)
                                                .build()))
                        .build();

        billingClient.queryProductDetailsAsync(
                queryProductDetailsParams,
                new ProductDetailsResponseListener() {
                    public void onProductDetailsResponse(BillingResult billingResult,
                                                         List<ProductDetails> productDetailsList) {
                        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && productDetailsList != null) {
                            ProductDetails productDetails = productDetailsList.get(0);
                            ImmutableList<BillingFlowParams.OfferToken> offerToken =
                                    ImmutableList.of(
                                            BillingFlowParams.OfferToken.newBuilder()
                                                    .setOfferToken(productDetails.getSubscriptionOfferDetails().get(0).getOfferToken())
                                                    .build()
                                    );

                            BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                                    .setProductDetailsParamsList(
                                            ImmutableList.of(
                                                    BillingFlowParams.ProductDetailsParams.newBuilder()
                                                            .setProductDetails(productDetails)
                                                            .setOfferToken(productDetails.getSubscriptionOfferDetails().get(0).getOfferToken())
                                                            .build()
                                            )
                                    )
                                    .build();
                            billingClient.launchBillingFlow(MainActivity.this, billingFlowParams);
                        }
                    }
                }
        );
    }
}
