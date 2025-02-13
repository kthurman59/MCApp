package com.yourcompany.martiancomics

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.yourcompany.martiancomics.R

class MainActivity : AppCompatActivity() {
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Set the layout defined in res/layout/activity_main.xml
        setContentView(R.layout.activity_main)

        // Example: Change the welcome text
        val welcomeText: TextView = findViewById(R.id.welcomeTextView)
        welcomeText.text = "Welcome to Martian Comics!"
    }
}
