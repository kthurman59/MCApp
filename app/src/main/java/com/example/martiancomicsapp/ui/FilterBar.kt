package com.example.martiancomicsapp.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun FilterBar(
    availableFilters: List<String>,
    selectedFilters: List<String>,
    onFilterSelected: (String) -> Unit
) {
    LazyRow(modifier = Modifier.padding(8.dp)) {
        items(availableFilters) { filter ->
            FilterChip(
                selected = selectedFilters.contains(filter),
                onClick = { onFilterSelected(filter) },
                label = { Text(filter, style = MaterialTheme.typography.bodyMedium) },
                modifier = Modifier.padding(end = 8.dp)
            )
        }
    }
}

