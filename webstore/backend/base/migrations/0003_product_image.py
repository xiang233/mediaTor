# Generated by Django 4.1.3 on 2022-11-30 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_order_rename_createdat_product_createdtime_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]
