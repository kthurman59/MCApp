package com.example.martiancomicsapp.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.martiancomicsapp.viewmodel.ComicsViewModel

@Composable
fun ComicsListScreen(viewModel: ComicsViewModel = viewModel()) {
    // Collect state from ViewModel
    val comics = viewModel.comics.collectAsState().value
    val selectedFilters = viewModel.selectedFilters.collectAsState().value
    val availableFilters = viewModel.getAvailableFilters()

    Column {
        // Filter bar at the top
        FilterBar(
            availableFilters = availableFilters,
            selectedFilters = selectedFilters,
            onFilterSelected = { viewModel.toggleFilter(it) }
        )
        // Comics list below
        LazyColumn {
            items(comics) { comic ->
                Text(
                    text = comic.title,
                    modifier = Modifier.padding(8.dp)
                )
            }
        }
    }
}

